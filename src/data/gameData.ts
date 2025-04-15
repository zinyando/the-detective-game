import { Person } from "../components/sidebar/PersonsList";
import { Evidence } from "../components/sidebar/EvidenceList";
import { Location } from "../components/sidebar/LocationsList";

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

interface GameData {
  persons: Person[];
  evidence: Evidence[];
  locations: Location[];
  notes: Note[];
}

export const gameData: GameData = {
  persons: [
    {
      id: "sarah-reynolds",
      name: "Sarah Reynolds",
      role: "Victim&apos;s Sister",
      mood: "Cooperative",
      trust: "Medium"
    },
    {
      id: "marcus-chen",
      name: "Marcus Chen",
      role: "Business Partner",
      mood: "Defensive",
      trust: "Low"
    },
    {
      id: "diana-wilkins",
      name: "Diana Wilkins",
      role: "Neighbor",
      mood: "Nervous",
      trust: "High"
    }
  ],
  evidence: [
    {
      id: "security-footage",
      title: "Security Footage",
      description: "Parkade Camera #3",
      details: "Footage shows an unidentified figure entering the building at 10:45 PM. The figure appears to be of similar build to the victim&apos;s business partner.",
      dateFound: "April 17, 2025",
      location: "Riverside Corporate Center"
    },
    {
      id: "threatening-email",
      title: "Threatening Email",
      description: "Sent 3 days before murder",
      details: "Email contains explicit threats regarding a business dispute. IP address traced to a local coffee shop frequented by Marcus Chen.",
      dateFound: "April 16, 2025",
      location: "Victim&apos;s Laptop"
    },
    {
      id: "phone-records",
      title: "Phone Records",
      description: "Call logs from victim&apos;s phone",
      details: "Multiple calls between victim and Marcus Chen on the night of the murder. Last call at 9:30 PM lasted 45 seconds.",
      dateFound: "April 18, 2025",
      location: "Phone Company Records"
    }
  ],
  locations: [
    {
      id: "riverside-corporate",
      name: "Riverside Corporate Center",
      address: "221B River Lane",
      status: "Active Crime Scene",
      lastVisited: "April 18, 2025",
      witnesses: ["Security Guard John Smith", "Janitor Maria Garcia"],
      notes: "Primary crime scene. Security cameras show suspicious activity around 10:45 PM."
    },
    {
      id: "victim-apartment",
      name: "Victim&apos;s Apartment",
      address: "42 Grove Street",
      status: "Secondary Scene",
      lastVisited: "April 17, 2025",
      witnesses: ["Neighbor Diana Wilkins", "Building Manager Tom Chen"],
      notes: "Found victim&apos;s personal diary with concerning entries about business disputes."
    },
    {
      id: "coffee-shop",
      name: "Local Coffee Shop",
      address: "7 Market Square",
      status: "Location of Interest",
      lastVisited: "April 16, 2025",
      witnesses: ["Barista Alex Wong", "Regular Customer Emily Davis"],
      notes: "IP address of threatening email traced to this location. Frequented by Marcus Chen."
    }
  ],
  notes: [
    {
      id: "1",
      title: "Initial Interview - Marcus Chen",
      content: "Suspect appears defensive. Claims to have been at office during time of murder. Need to verify security logs.",
      timestamp: "April 18, 2025 - 14:30"
    },
    {
      id: "2",
      title: "Security Footage Analysis",
      content: "Unidentified figure matches Chen&apos;s build. Timestamp correlates with phone records.",
      timestamp: "April 18, 2025 - 16:45"
    }
  ]
};
