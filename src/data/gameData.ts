import { Person } from "../components/sidebar/PersonsList";
import { Evidence } from "../components/sidebar/EvidenceList";
import { Location } from "../components/sidebar/LocationsList";

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  importance: string;
}

interface InterrogationTopic {
  id: string;
  title: string;
  description: string;
  relevantEvidence: string[];
}

interface GameData {
  persons: Person[];
  evidence: Evidence[];
  locations: Location[];
  notes: Note[];
  interrogationTopics: InterrogationTopic[];
}

export const gameData: GameData = {
  persons: [
    {
      id: "sarah-reynolds",
      name: "Sarah Reynolds",
      role: "Victim's Sister",
      mood: "Cooperative",
      trust: "Medium",
      background:
        "Michael's younger sister and VP of Marketing at TechVision. Named as beneficiary on Michael's recently updated life insurance policy worth $2 million.",
      alibi: "Claims to have been at home alone during the time of murder.",
      motive:
        "Financial gain from insurance policy; would inherit Michael's shares in the company.",
      profileImage: "https://i.pravatar.cc/150?img=47",
    },
    {
      id: "marcus-chen",
      name: "Marcus Chen",
      role: "Business Partner",
      mood: "Defensive",
      trust: "Low",
      background:
        "Co-founder of TechVision Solutions. Recently had several heated arguments with Michael over company direction.",
      alibi:
        "Claims to have been working late at a different office, but security footage contradicts this statement.",
      motive:
        "Would gain full control of company patents; recently discovered Michael was having an affair with his wife.",
      profileImage: "/chen-image.png",
    },
    {
      id: "diana-wilkins",
      name: "Diana Wilkins",
      role: "Neighbor",
      mood: "Nervous",
      trust: "High",
      background:
        "Lives in the apartment adjacent to Michael's. Recently divorced and new to the building.",
      alibi:
        "Claims to have been home watching TV. Neighbor across hall confirms hearing her TV, but didn't actually see her.",
      motive:
        "Secret obsession with Michael; discovered he was planning to relocate overseas.",
      profileImage: "https://i.pravatar.cc/150?img=45",
    },
    {
      id: "tom-johnson",
      name: "Tom Johnson",
      role: "Building Manager",
      mood: "Evasive",
      trust: "Medium",
      background: "Has worked at victim's apartment building for three years.",
      alibi: "Claims to have been at a dinner during the murder.",
      motive: "Owed Michael significant money for gambling debts.",
      profileImage: "/tom-image.png",
    },
    {
      id: "alex-rivera",
      name: "Alex Rivera",
      role: "Coffee Shop Barista",
      mood: "Helpful",
      trust: "High",
      background:
        "Worked at the coffee shop for five years. Knows most regular customers by name and order.",
      alibi:
        "Working during the afternoon before the murder, not relevant to time of murder.",
      motive: "None apparent.",
      profileImage: "/rivera-image.png",
    },
  ],
  evidence: [
    {
      id: "security-footage",
      title: "Security Footage",
      description: "Parkade Camera #3",
      details:
        "Footage shows an unidentified figure entering the building at 10:45 PM. The figure appears to be of similar build to Marcus Chen.",
      dateFound: "April 17, 2025",
      location: "Riverside Corporate Center",
      importance: "High",
      veracity: "Questionable - later discovered to have been tampered with",
    },
    {
      id: "threatening-email",
      title: "Threatening Email",
      description: "Sent 3 days before murder",
      details:
        "Email contains explicit threats regarding a business dispute. IP address traced to a local coffee shop frequented by Marcus Chen.",
      dateFound: "April 16, 2025",
      location: "Victim's Laptop",
      importance: "High",
      veracity: "Authentic email, questionable origin",
    },
    {
      id: "phone-records",
      title: "Phone Records",
      description: "Call logs from victim's phone",
      details:
        "Multiple calls between victim and Marcus Chen on the night of the murder. Last call at 9:30 PM lasted 45 seconds.",
      dateFound: "April 18, 2025",
      location: "Phone Company Records",
      importance: "Medium",
      veracity: "Confirmed authentic",
    },
    {
      id: "personal-diary",
      title: "Victim's Personal Diary",
      description: "Private journal found in hidden compartment",
      details:
        "Contains entries about business disputes with Marcus, affair with Marcus's wife, and strange encounters with 'the woman next door'.",
      dateFound: "April 17, 2025",
      location: "Victim's Apartment",
      importance: "High",
      veracity: "Confirmed authentic",
    },
    {
      id: "life-insurance",
      title: "Life Insurance Policy",
      description: "Recently updated policy",
      details:
        "$2 million policy with Sarah Reynolds as sole beneficiary. Updated just two weeks before the murder.",
      dateFound: "April 19, 2025",
      location: "Victim's Digital Records",
      importance: "Medium",
      veracity: "Confirmed authentic",
    },
    {
      id: "hidden-partnership",
      title: "Secret Partnership Agreement",
      description: "Unsigned contract draft",
      details:
        "Draft agreement with competitor that would have effectively cut Marcus out of key patents and future royalties.",
      dateFound: "April 20, 2025",
      location: "Victim's Private Cloud Storage",
      importance: "High",
      veracity: "Confirmed authentic",
    },
    {
      id: "stalker-photos",
      title: "Surveillance Photos",
      description: "Hidden behind painting in Diana's apartment",
      details:
        "Dozens of photos of Michael taken without his knowledge, spanning several months. Some photos show inside of his apartment.",
      dateFound: "April 21, 2025",
      location: "Diana Wilkins' Apartment",
      importance: "Critical",
      veracity: "Confirmed authentic",
    },
  ],
  locations: [
    {
      id: "riverside-corporate",
      name: "Riverside Corporate Center",
      address: "221B River Lane",
      status: "Active Crime Scene",
      lastVisited: "April 18, 2025",
      witnesses: ["Security Guard John Smith", "Janitor Maria Garcia"],
      notes:
        "Primary crime scene. Security cameras show suspicious activity around 10:45 PM.",
      availableEvidence: ["security-footage", "murder-weapon"],
      description:
        "Modern glass and steel building housing several tech startups. Michael's office is on the 15th floor with views of the river. Access requires keycard after hours.",
    },
    {
      id: "victim-apartment",
      name: "Victim's Apartment",
      address: "42 Grove Street, Apt 718",
      status: "Secondary Scene",
      lastVisited: "April 17, 2025",
      witnesses: ["Neighbor Diana Wilkins", "Building Manager Tom Johnson"],
      notes:
        "Found victim's personal diary with concerning entries about business disputes.",
      availableEvidence: ["personal-diary", "laptop"],
      description:
        "Luxury high-rise apartment with sophisticated security system. Michael lived alone in a two-bedroom unit with minimalist, expensive furnishings.",
    },
    {
      id: "coffee-shop",
      name: "Riverside Brews",
      address: "7 Market Square",
      status: "Location of Interest",
      lastVisited: "April 16, 2025",
      witnesses: ["Barista Alex Wong", "Regular Customer Emily Davis"],
      notes:
        "IP address of threatening email traced to this location. Frequented by Marcus Chen.",
      availableEvidence: ["wifi-logs", "security-cam"],
      description:
        "Popular local coffee shop with free wifi. Frequented by employees from nearby office buildings. Has outdoor seating with view of Riverside Corporate Center.",
    },
    {
      id: "techvision-office",
      name: "TechVision Solutions Headquarters",
      address: "100 Innovation Drive",
      status: "Location of Interest",
      lastVisited: "April 19, 2025",
      witnesses: ["Executive Assistant Priya Patel", "CTO James Wilson"],
      notes:
        "Company headquarters contains financial records and employee access logs.",
      availableEvidence: ["financial-records", "access-logs"],
      description:
        "Main office of the victim's company. Houses executive offices, R&D labs, and server rooms containing sensitive company data.",
    },
    {
      id: "diana-apartment",
      name: "Diana Wilkins' Apartment",
      address: "42 Grove Street, Apt 720",
      status: "Search Warrant Executed",
      lastVisited: "April 21, 2025",
      witnesses: ["Building Security Officer", "Forensic Team Leader"],
      notes:
        "Apartment directly adjacent to victim's. Hidden surveillance setup discovered.",
      availableEvidence: [
        "stalker-photos",
        "building-access-card",
        "victim's-stolen-items",
      ],
      description:
        "Similar layout to victim's apartment but decorated sparsely. Features a small home office with line of sight to victim's balcony.",
    },
  ],
  notes: [
    {
      id: "1",
      title: "Initial Interview - Marcus Chen",
      content:
        "Suspect appears defensive. Claims to have been at office during time of murder. Need to verify security logs.",
      timestamp: "April 18, 2025 - 14:30",
      importance: "High",
    },
    {
      id: "2",
      title: "Security Footage Analysis",
      content:
        "Unidentified figure matches Chen's build. Timestamp correlates with phone records.",
      timestamp: "April 18, 2025 - 16:45",
      importance: "High",
    },
    {
      id: "3",
      title: "Financial Investigation",
      content:
        "Company on verge of bankruptcy. Recent conflict between Michael and Marcus over potential buyout offer.",
      timestamp: "April 19, 2025 - 10:15",
      importance: "Medium",
    },
    {
      id: "4",
      title: "Sarah Reynolds Follow-up",
      content:
        "Recently unemployed. Financial records show significant debt. Appeared genuinely distraught about brother's death.",
      timestamp: "April 19, 2025 - 15:30",
      importance: "Medium",
    },
    {
      id: "5",
      title: "Coffee Shop Investigation",
      content:
        "Barista confirms Marcus was regular customer. Email traced to public wifi. Security camera shows unidentified woman using laptop at time email was sent.",
      timestamp: "April 20, 2025 - 11:20",
      importance: "High",
    },
    {
      id: "6",
      title: "Diana Wilkins Background Check",
      content:
        "Recently divorced after 12-year marriage. History of psychiatric treatment for obsessive behavior. Moved into building three months after Michael.",
      timestamp: "April 20, 2025 - 17:45",
      importance: "Critical",
    },
    {
      id: "7",
      title: "Security System Analysis",
      content:
        "Building security logs show Diana's access card used on victim's floor multiple times during unauthorized hours.",
      timestamp: "April 21, 2025 - 09:30",
      importance: "Critical",
    },
  ],
  interrogationTopics: [
    {
      id: "alibi-verification",
      title: "Alibi Verification",
      description:
        "Questioning suspects about their whereabouts during 10:30-11:30 PM on April 17.",
      relevantEvidence: ["security-footage", "phone-records"],
    },
    {
      id: "business-relationships",
      title: "Business Relationships",
      description:
        "Exploring professional tensions and rivalries at TechVision Solutions.",
      relevantEvidence: [
        "threatening-email",
        "hidden-partnership",
        "financial-records",
      ],
    },
    {
      id: "personal-relationships",
      title: "Personal Relationships",
      description:
        "Investigating interpersonal dynamics including the affair and stalking behavior.",
      relevantEvidence: ["personal-diary", "stalker-photos"],
    },
    {
      id: "financial-motivations",
      title: "Financial Motivations",
      description:
        "Examining money troubles and potential financial gain from Michael's death.",
      relevantEvidence: ["life-insurance", "financial-records"],
    },
  ],
};
