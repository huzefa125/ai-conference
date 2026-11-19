// SAMPLE DATA: these are placeholder reviews with fictional names. They are NOT from real attendees.
// Replace them with real, permissioned quotes before launch.

export interface Review {
  name: string;
  username: string;
  body: string;
  /** Optional photo URL. Without one, an initials avatar is shown. */
  profile?: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Aarav Mehta",
    username: "Head of Platform, Sample Co.",
    body: "“The talks were specific. Speakers showed what broke in production and what it cost, which is exactly what our team needed.”",
  },
  {
    name: "Nisha Rao",
    username: "ML Engineer, Sample Labs",
    body: "“The workshops were the highlight. Small room, real problem, and I left with something I could use the next Monday.”",
  },
  {
    name: "Rohan Iyer",
    username: "Founder, Sample AI",
    body: "“I met more useful people in the evening sessions than at any other event this year.”",
  },
  {
    name: "Priya Nair",
    username: "VP Product, Sample Systems",
    body: "“Clear tracks made it easy to pick sessions for my role. The recordings let my team catch up on what they missed.”",
  },
  {
    name: "Karthik Reddy",
    username: "CTO, Sample Data",
    body: "“Practical, honest and well run. Less hype, more engineering.”",
  },
  {
    name: "Ananya Das",
    username: "Research Lead, Sample Institute",
    body: "“Good mix of research and production talks. The hallway conversations alone were worth the trip.”",
  },
  {
    name: "Vikram Shah",
    username: "Director of AI, Sample Group",
    body: "“Our leadership team came away with a clearer plan for rolling out AI responsibly. We are sending more people next year.”",
  },
  {
    name: "Meera Krishnan",
    username: "Engineering Manager, Sample Cloud",
    body: "“The infrastructure track went deep on cost and latency. My team has already changed how we plan capacity.”",
  },
  {
    name: "Imran Qureshi",
    username: "Product Lead, Sample Health",
    body: "“Well organised from check-in to the last session. Every room had a clear topic and a speaker who knew it.”",
  },
];
