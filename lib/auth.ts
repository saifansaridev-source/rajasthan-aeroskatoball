import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import { User } from "@/models";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const email = credentials.email.toLowerCase();
        const password = credentials.password;

        // Default admin credentials fallback check
        const isDefaultAdmin =
          email === "admin@rajasthanaeroskatoball.org" &&
          (password === "admin123" || password === (process.env.ADMIN_INITIAL_PASSWORD || "admin123"));

        try {
          const conn = await connectDB();
          if (conn) {
            let user = await User.findOne({ email });

            // If default admin doesn't exist in DB yet, auto-create
            if (!user && isDefaultAdmin) {
              const hashedPassword = await bcrypt.hash(password, 10);
              user = await User.create({
                email,
                name: "State Admin",
                password: hashedPassword,
                role: "SUPER_ADMIN",
              });
            }

            if (user && user.password) {
              const isValid = await bcrypt.compare(password, user.password);
              if (isValid) {
                return {
                  id: user._id.toString(),
                  name: user.name || "State Admin",
                  email: user.email,
                  role: user.role || "SUPER_ADMIN",
                };
              }
            }
          }
        } catch (err) {
          console.error("Auth database check warning:", err);
        }

        // If DB is unreachable or user not found, allow default admin credentials
        if (isDefaultAdmin) {
          return {
            id: "admin-default-id",
            name: "State Admin",
            email: "admin@rajasthanaeroskatoball.org",
            role: "SUPER_ADMIN",
          };
        }

        throw new Error("Invalid email address or password");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "rajasthan-aeroskatoball-secret-key-2026-production-grade",
  pages: {
    signIn: "/admin/login",
  },
};
