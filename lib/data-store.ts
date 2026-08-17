// Comprehensive Data Store & In-Memory Fallback for Rajasthan Aeroskatoball Association

export interface IRegistrationData {
  id: string;
  regNo: string;
  type: "PLAYER" | "COACH" | "DISTRICT" | "CLUB" | "OFFICIAL" | "REFEREE" | "VOLUNTEER";
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "EXPIRED" | "RENEWAL_DUE";
  name: string;
  email: string;
  phone: string;
  dob?: string;
  gender?: string;
  bloodGroup?: string;
  aadhaar?: string;
  fatherName?: string;
  motherName?: string;
  address?: string;
  district: string;
  state: string;
  pincode?: string;
  emergencyContact?: string;
  photoUrl?: string;
  signatureUrl?: string;
  
  // Player specific
  club?: string;
  coach?: string;
  ageCategory?: string;
  playingCategory?: string;
  experience?: string;
  achievements?: string;

  // Coach specific
  coachingLevel?: string;
  qualification?: string;
  specialization?: string;
  academy?: string;

  // District specific
  associationName?: string;
  presidentName?: string;
  presidentContact?: string;
  secretaryName?: string;
  secretaryContact?: string;
  treasurerName?: string;
  treasurerContact?: string;
  committeeMembers?: Array<{ name: string; designation: string; phone: string }>;
  panNumber?: string;

  // Club specific
  clubName?: string;
  registrationNumber?: string;
  ownerName?: string;
  headCoachName?: string;
  groundAddress?: string;
  facilities?: string[];

  // Payment info
  paymentStatus: "PAID" | "PENDING" | "FAILED";
  paymentAmount: number;
  paymentTxnId?: string;
  paidAt?: string;

  // Suspension workflow
  suspension?: {
    reason: string;
    from: string;
    till: string;
    duration: string;
    remarks: string;
    evidenceUrl?: string;
    autoReactivate: boolean;
    permanent: boolean;
  };

  validUntil: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChampionship {
  id: string;
  title: string;
  description: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
  startDate: string;
  endDate: string;
  venue: string;
  district: string;
  ageGroup: string;
  entryFee: number;
  registrationDeadline: string;
  image: string;
  circularUrl?: string;
  mapEmbedUrl?: string;
}

export interface IResultItem {
  id: string;
  championshipName: string;
  year: string;
  category: string;
  district: string;
  goldWinner: string;
  silverWinner: string;
  bronzeWinner: string;
  bestPlayer: string;
  pdfUrl: string;
  date: string;
}

export interface IDownloadItem {
  id: string;
  title: string;
  description: string;
  category: "RULE_BOOK" | "CIRCULAR" | "FORM" | "SELECTION_POLICY" | "CALENDAR" | "CERTIFICATE";
  fileSize: string;
  fileType: "PDF" | "DOCX" | "ZIP";
  publishDate: string;
  fileUrl: string;
}

export interface IGalleryMedia {
  id: string;
  title: string;
  type: "PHOTO" | "VIDEO";
  url: string;
  thumbnail: string;
  albumName: string;
  date: string;
}

export interface ICommitteeMember {
  id: string;
  name: string;
  designation: string;
  order: number;
  district: string;
  mobile: string;
  email: string;
  photo: string;
}

export interface INewsArticle {
  id: string;
  title: string;
  category: "NEWS" | "CIRCULAR" | "NOTIFICATION" | "SELECTION_LIST";
  publishDate: string;
  excerpt: string;
  content: string;
  image?: string;
  fileUrl?: string;
  featured?: boolean;
}

export interface IAuditLog {
  id: string;
  action: string;
  performedBy: string;
  target: string;
  details: string;
  timestamp: string;
}

// Initial Mock / Seed Records
export const initialRegistrations: IRegistrationData[] = [
  {
    id: "reg-101",
    regNo: "RAA-PLY-2026-0042",
    type: "PLAYER",
    status: "APPROVED",
    name: "Aman Sharma",
    email: "aman.skate@gmail.com",
    phone: "9829012345",
    dob: "2006-04-14",
    gender: "Male",
    bloodGroup: "B+",
    aadhaar: "XXXXXXXX4821",
    fatherName: "Rajendra Sharma",
    motherName: "Sunita Sharma",
    address: "Plot 14, Kumher Gate, Bharatpur",
    district: "Bharatpur",
    state: "Rajasthan",
    pincode: "321001",
    emergencyContact: "9829012344",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    club: "Bharatpur Aero Skaters Club",
    coach: "Coach Vikram Rathore",
    ageCategory: "Senior (18+)",
    playingCategory: "Aerial Freestyle & Speed Roll",
    experience: "5 Years",
    achievements: "Gold Medalist 2025 State Aeroskatoball Cup",
    paymentStatus: "PAID",
    paymentAmount: 500,
    paymentTxnId: "TXN-RAA-894211",
    paidAt: "2026-02-10",
    validUntil: "2027-03-31",
    createdAt: "2026-02-10T10:30:00Z",
    updatedAt: "2026-02-11T14:20:00Z",
  },
  {
    id: "reg-102",
    regNo: "RAA-PLY-2026-0078",
    type: "PLAYER",
    status: "APPROVED",
    name: "Pooja Choudhary",
    email: "pooja.speed@outlook.com",
    phone: "9414088712",
    dob: "2008-09-22",
    gender: "Female",
    bloodGroup: "O+",
    aadhaar: "XXXXXXXX7319",
    fatherName: "Kailash Choudhary",
    motherName: "Mamta Choudhary",
    address: "B-42 Vaishali Nagar, Jaipur",
    district: "Jaipur",
    state: "Rajasthan",
    pincode: "302021",
    emergencyContact: "9414088700",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    club: "Pink City Skaters Guild",
    coach: "Coach Meenakshi Shekhawat",
    ageCategory: "Junior (U-17)",
    playingCategory: "Slalom Sprint & Target Scoring",
    experience: "3 Years",
    achievements: "Silver Medalist in North Zone Open 2025",
    paymentStatus: "PAID",
    paymentAmount: 500,
    paymentTxnId: "TXN-RAA-901234",
    paidAt: "2026-02-14",
    validUntil: "2027-03-31",
    createdAt: "2026-02-14T08:15:00Z",
    updatedAt: "2026-02-15T09:00:00Z",
  },
  {
    id: "reg-103",
    regNo: "RAA-COA-2026-0012",
    type: "COACH",
    status: "APPROVED",
    name: "Vikram Rathore",
    email: "vikram.coach@raasport.in",
    phone: "9829155432",
    gender: "Male",
    district: "Bharatpur",
    state: "Rajasthan",
    coachingLevel: "National Level 3 Certified",
    qualification: "B.P.Ed, Certified Aeroskatoball Master Trainer",
    specialization: "High Speed Transition & Tactical Plays",
    academy: "Bharatpur Aero Skaters Club",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    paymentStatus: "PAID",
    paymentAmount: 1500,
    paymentTxnId: "TXN-RAA-905541",
    paidAt: "2026-01-20",
    validUntil: "2027-03-31",
    createdAt: "2026-01-20T11:00:00Z",
    updatedAt: "2026-01-21T10:00:00Z",
  },
  {
    id: "reg-104",
    regNo: "RAA-DST-2026-0001",
    type: "DISTRICT",
    status: "APPROVED",
    name: "Bharatpur District Aeroskatoball Association",
    email: "bharatpur.district@rajasthanaeroskatoball.org",
    phone: "8504092852",
    district: "Bharatpur",
    state: "Rajasthan",
    associationName: "District Aeroskatoball Association Bharatpur",
    presidentName: "Dr. Arvind Singh",
    presidentContact: "9414012345",
    secretaryName: "Mahendra Verma",
    secretaryContact: "8504092852",
    treasurerName: "Rajesh Saini",
    treasurerContact: "9829033221",
    panNumber: "AABTR8912P",
    committeeMembers: [
      { name: "Suresh Gupta", designation: "Vice President", phone: "9414022334" },
      { name: "Dinesh Koli", designation: "Joint Secretary", phone: "9829044556" },
      { name: "Anita Meena", designation: "Women Coordinator", phone: "9414055667" },
    ],
    photoUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&auto=format&fit=crop&q=80",
    paymentStatus: "PAID",
    paymentAmount: 5000,
    paymentTxnId: "TXN-RAA-908812",
    paidAt: "2026-01-05",
    validUntil: "2027-03-31",
    createdAt: "2026-01-05T09:30:00Z",
    updatedAt: "2026-01-06T12:00:00Z",
  },
  {
    id: "reg-105",
    regNo: "RAA-CLB-2026-0008",
    type: "CLUB",
    status: "APPROVED",
    name: "Royal Mewar Skaters Club",
    email: "mewar.skate@gmail.com",
    phone: "9829344122",
    district: "Udaipur",
    state: "Rajasthan",
    clubName: "Royal Mewar Skaters Club",
    registrationNumber: "REG/UD/2026/09",
    ownerName: "Kunwar Raghuveer Singh",
    headCoachName: "Siddharth Bhatnagar",
    groundAddress: "Fateh Sagar Sports Complex, Udaipur",
    facilities: ["Synthetic Skating Rink", "Lighting System", "Medical First Aid", "Locker Rooms"],
    photoUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&auto=format&fit=crop&q=80",
    paymentStatus: "PAID",
    paymentAmount: 2500,
    paymentTxnId: "TXN-RAA-911432",
    paidAt: "2026-02-01",
    validUntil: "2027-03-31",
    createdAt: "2026-02-01T15:00:00Z",
    updatedAt: "2026-02-02T10:00:00Z",
  },
  {
    id: "reg-106",
    regNo: "RAA-PLY-2026-0115",
    type: "PLAYER",
    status: "PENDING",
    name: "Rahul Meena",
    email: "rahul.meena88@gmail.com",
    phone: "9829876543",
    dob: "2007-06-18",
    gender: "Male",
    bloodGroup: "A+",
    aadhaar: "XXXXXXXX9921",
    district: "Kota",
    state: "Rajasthan",
    club: "Hadoti Skaters Hub",
    ageCategory: "Youth (U-19)",
    playingCategory: "High Flight Goal Strike",
    paymentStatus: "PAID",
    paymentAmount: 500,
    paymentTxnId: "TXN-RAA-923481",
    validUntil: "2027-03-31",
    createdAt: "2026-03-01T12:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z",
  }
];

export const initialChampionships: IChampionship[] = [
  {
    id: "champ-2026-01",
    title: "1st Rajasthan State Senior Aeroskatoball Championship 2026",
    description: "The premier state championship hosting over 300 athletes from 25+ districts across Rajasthan for selection to Nationals.",
    status: "UPCOMING",
    startDate: "2026-04-10",
    endDate: "2026-04-13",
    venue: "Lohagarh Indoor Stadium & Sports Complex, Bharatpur",
    district: "Bharatpur",
    ageGroup: "Senior & Masters (Open)",
    entryFee: 750,
    registrationDeadline: "2026-04-02",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80",
    circularUrl: "/downloads",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113470.82025178556!2d77.44754752539062!3d27.215186000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973a388f8d9b1a5%3A0x6b44558e658399fa!2sBharatpur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },
  {
    id: "champ-2026-02",
    title: "Rajasthan Junior & Sub-Junior State Aeroskatoball Cup 2026",
    description: "State level developmental cup for U-14 and U-17 boys and girls showcasing emerging talent.",
    status: "UPCOMING",
    startDate: "2026-05-18",
    endDate: "2026-05-20",
    venue: "SMS Stadium Skating Quad, Jaipur",
    district: "Jaipur",
    ageGroup: "Sub-Junior (U-14) & Junior (U-17)",
    entryFee: 500,
    registrationDeadline: "2026-05-05",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80",
    circularUrl: "/downloads",
  },
  {
    id: "champ-2025-01",
    title: "State Winter Aeroskatoball Invitational 2025",
    description: "Annual invitational clash of top district squads with high-tempo thrilling knockout matches.",
    status: "COMPLETED",
    startDate: "2025-12-15",
    endDate: "2025-12-17",
    venue: "Maharana Pratap Khel Gaon, Udaipur",
    district: "Udaipur",
    ageGroup: "All Categories",
    entryFee: 500,
    registrationDeadline: "2025-12-05",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80",
  }
];

export const initialResults: IResultItem[] = [
  {
    id: "res-01",
    championshipName: "State Winter Aeroskatoball Invitational 2025",
    year: "2025",
    category: "Senior Men",
    district: "Bharatpur",
    goldWinner: "Bharatpur Aeroskaters Team A",
    silverWinner: "Jaipur Thunder Blades",
    bronzeWinner: "Udaipur Royal Skaters",
    bestPlayer: "Aman Sharma (Bharatpur)",
    pdfUrl: "#",
    date: "2025-12-18",
  },
  {
    id: "res-02",
    championshipName: "State Winter Aeroskatoball Invitational 2025",
    year: "2025",
    category: "Junior Girls (U-17)",
    district: "Jaipur",
    goldWinner: "Pink City Flyers (Jaipur)",
    silverWinner: "Jodhpur Desert Hawks",
    bronzeWinner: "Bharatpur Warriors",
    bestPlayer: "Pooja Choudhary (Jaipur)",
    pdfUrl: "#",
    date: "2025-12-18",
  },
  {
    id: "res-03",
    championshipName: "Rajasthan State Cup 2025",
    year: "2025",
    category: "Senior Women",
    district: "Kota",
    goldWinner: "Kota Aero Queens",
    silverWinner: "Ajmer Falcon Rollers",
    bronzeWinner: "Bikaner Camels Aero Club",
    bestPlayer: "Simran Saini (Kota)",
    pdfUrl: "#",
    date: "2025-08-22",
  }
];

export const initialDownloads: IDownloadItem[] = [
  {
    id: "dl-01",
    title: "Official Aeroskatoball Technical Rule Book (2026 Edition)",
    description: "Complete governing rules, pitch dimensions, scoring protocols, penalties, and referee guidelines.",
    category: "RULE_BOOK",
    fileSize: "3.4 MB",
    fileType: "PDF",
    publishDate: "2026-01-15",
    fileUrl: "/docs/RAA_Official_Rulebook_2026.pdf",
  },
  {
    id: "dl-02",
    title: "Circular No. RAA/2026/04 — State Championship 2026 Notice",
    description: "Official circular detailing championship dates, venue guidelines, registration process, and food/lodging instructions.",
    category: "CIRCULAR",
    fileSize: "1.2 MB",
    fileType: "PDF",
    publishDate: "2026-02-01",
    fileUrl: "/docs/RAA_Circular_04_State_Championship.pdf",
  },
  {
    id: "dl-03",
    title: "State Team Selection Policy & Eligibility Criteria 2026",
    description: "Criteria and trials schedule for selecting the official Rajasthan Contingent for National Championships.",
    category: "SELECTION_POLICY",
    fileSize: "850 KB",
    fileType: "PDF",
    publishDate: "2026-01-20",
    fileUrl: "/docs/RAA_Selection_Policy_2026.pdf",
  },
  {
    id: "dl-04",
    title: "Official Association Constitution & Bylaws",
    description: "Memorandum and Articles of Association registered under Section 8 Not-For-Profit Companies Act.",
    category: "FORM",
    fileSize: "2.1 MB",
    fileType: "PDF",
    publishDate: "2026-01-01",
    fileUrl: "/docs/RAA_Constitution.pdf",
  },
  {
    id: "dl-05",
    title: "Annual Sports Calendar 2026-2027",
    description: "Full schedule of district tournaments, state trials, coaching clinics, and referee certification camps.",
    category: "CALENDAR",
    fileSize: "1.5 MB",
    fileType: "PDF",
    publishDate: "2026-01-10",
    fileUrl: "/docs/RAA_Annual_Calendar_2026.pdf",
  },
  {
    id: "dl-06",
    title: "Sample Medical Fitness & Parental Consent Declaration Form",
    description: "Mandatory medical clearance and indemnity form for athletes under 18 years participating in state events.",
    category: "FORM",
    fileSize: "420 KB",
    fileType: "PDF",
    publishDate: "2026-01-12",
    fileUrl: "/docs/RAA_Medical_Form.pdf",
  }
];

export const initialGallery: IGalleryMedia[] = [
  {
    id: "gal-01",
    title: "Action-Packed Goal Attempt in State Final 2025",
    type: "PHOTO",
    url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&auto=format&fit=crop&q=80",
    albumName: "State Championship 2025",
    date: "2025-12-17",
  },
  {
    id: "gal-02",
    title: "Opening Ceremony Parade — District Contingents",
    type: "PHOTO",
    url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&auto=format&fit=crop&q=80",
    albumName: "State Championship 2025",
    date: "2025-12-15",
  },
  {
    id: "gal-03",
    title: "Medal Ceremony & Trophy Presentation to Champions",
    type: "PHOTO",
    url: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=1200&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=500&auto=format&fit=crop&q=80",
    albumName: "State Championship 2025",
    date: "2025-12-17",
  },
  {
    id: "gal-04",
    title: "Official State Referee & Technical Clinic",
    type: "PHOTO",
    url: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=1200&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=500&auto=format&fit=crop&q=80",
    albumName: "Workshops & Clinics",
    date: "2026-01-28",
  },
  {
    id: "gal-05",
    title: "State Championship High-Octane Match Highlights",
    type: "VIDEO",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&auto=format&fit=crop&q=80",
    albumName: "State Championship 2025",
    date: "2025-12-16",
  },
  {
    id: "gal-06",
    title: "Youth Athlete Training Session in Bharatpur",
    type: "PHOTO",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    albumName: "Grassroots Development",
    date: "2026-02-12",
  }
];

export const initialCommittee: ICommitteeMember[] = [
  {
    id: "com-01",
    name: "Dr. Arvind Singh",
    designation: "President",
    order: 1,
    district: "Bharatpur",
    mobile: "+91 94140 12345",
    email: "president@rajasthanaeroskatoball.org",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "com-02",
    name: "Shri Mahendra Verma",
    designation: "General Secretary",
    order: 2,
    district: "Bharatpur",
    mobile: "+91 85040 92852",
    email: "secretary@rajasthanaeroskatoball.org",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "com-03",
    name: "Shri Rajesh Saini",
    designation: "Treasurer",
    order: 3,
    district: "Jaipur",
    mobile: "+91 98290 33221",
    email: "treasurer@rajasthanaeroskatoball.org",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "com-04",
    name: "Smt. Sunita Kanwar",
    designation: "Senior Vice President",
    order: 4,
    district: "Jodhpur",
    mobile: "+91 94140 66778",
    email: "vp.kanwar@rajasthanaeroskatoball.org",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "com-05",
    name: "Shri Vikram Rathore",
    designation: "Technical Director & Chief Coach",
    order: 5,
    district: "Bharatpur",
    mobile: "+91 98291 55432",
    email: "technical@rajasthanaeroskatoball.org",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "com-06",
    name: "Shri Deepak Sharma",
    designation: "Joint Secretary",
    order: 6,
    district: "Udaipur",
    mobile: "+91 94140 99881",
    email: "deepak.sharma@rajasthanaeroskatoball.org",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
  }
];

export const initialNews: INewsArticle[] = [
  {
    id: "news-01",
    title: "1st Rajasthan State Aeroskatoball Championship 2026 Officially Announced in Bharatpur",
    category: "NEWS",
    publishDate: "2026-02-28",
    excerpt: "Over 350 athletes from across Rajasthan will convene in Bharatpur this April for the landmark State Championship.",
    content: "The Executive Committee of Rajasthan Aeroskatoball Association (RAA) in its general body meeting has finalized the dates for the 1st Rajasthan State Aeroskatoball Championship 2026, scheduled to take place at Lohagarh Sports Arena, Bharatpur from April 10 to April 13, 2026. District associations are instructed to conclude district trials before March 25, 2026.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80",
    featured: true,
  },
  {
    id: "news-02",
    title: "Mandatory Digital ID Cards and QR Verification Launched for All Athletes",
    category: "NOTIFICATION",
    publishDate: "2026-02-20",
    excerpt: "Anti-fraud digital player passes with encrypted QR codes will now be required for all official championships.",
    content: "To maintain fair play and transparent verification, RAA has officially integrated the Digital ID Pass system with instant QR verification. Every registered player, coach, and referee can now download their digital card from the Member Dashboard.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
    featured: true,
  },
  {
    id: "news-03",
    title: "Circular No. 04/2026: Affiliated District Associations Registration Guidelines",
    category: "CIRCULAR",
    publishDate: "2026-02-15",
    excerpt: "Guidelines issued for all 50 districts of Rajasthan to submit renewal documents and athlete lists.",
    content: "All district committees must complete annual affiliation renewals and upload required committee member lists through the official RAA District Portal before March 31, 2026.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80",
    featured: false,
  },
  {
    id: "news-04",
    title: "Rajasthan Senior State Squad Selection Trial List Released",
    category: "SELECTION_LIST",
    publishDate: "2026-02-10",
    excerpt: "List of shortlisted probables called for National Championship Preparatory Camp.",
    content: "The selection panel headed by Technical Director Vikram Rathore has published the list of top 30 athletes shortlisted from the winter championships to attend the intensive high-altitude training camp.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80",
    featured: false,
  }
];

export const initialAuditLogs: IAuditLog[] = [
  {
    id: "log-01",
    action: "REGISTRATION_APPROVED",
    performedBy: "admin@rajasthanaeroskatoball.org",
    target: "RAA-PLY-2026-0042 (Aman Sharma)",
    details: "Approved player registration and generated active Digital ID.",
    timestamp: "2026-02-11T14:20:00Z",
  },
  {
    id: "log-02",
    action: "CHAMPIONSHIP_PUBLISHED",
    performedBy: "admin@rajasthanaeroskatoball.org",
    target: "1st Rajasthan State Senior Championship 2026",
    details: "Created and published championship notice with online registrations.",
    timestamp: "2026-02-28T09:15:00Z",
  }
];

export const rajasthanDistricts = [
  "Ajmer", "Alwar", "Anupgarh", "Balotra", "Banswara", "Baran", "Barmer", "Beawar",
  "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa",
  "Deeg", "Dholpur", "Didwana-Kuchaman", "Dudu", "Dungarpur", "Gangapur City",
  "Hanumangarh", "Jaipur", "Jaipur Rural", "Jaisalmer", "Jalore", "Jhalawar",
  "Jhunjhunu", "Jodhpur", "Jodhpur Rural", "Karauli", "Kekri", "Khairthal-Tijara",
  "Kota", "Kotputli-Behror", "Nagaur", "Neem Ka Thana", "Pali", "Phalodi",
  "Pratapgarh", "Rajsamand", "Salumbar", "Sanchore", "Sawai Madhopur", "Shahpura",
  "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
];
