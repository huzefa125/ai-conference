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
    username: "Postdoctoral Researcher, Sample Institute",
    body: "“The talks were specific. Speakers showed their methods, what went wrong in the lab and how they fixed it, which is exactly what our group needed.”",
  },
  {
    name: "Nisha Rao",
    username: "PhD Student, Sample University",
    body: "“The lab sessions were the highlight. Small room, real samples, and I left with a protocol I could use the next Monday.”",
  },
  {
    name: "Rohan Iyer",
    username: "Field Ecologist, Sample Research Station",
    body: "“I met more useful collaborators in the evening sessions than at any other meeting this year.”",
  },
  {
    name: "Priya Nair",
    username: "Lab Manager, Sample Biosciences Lab",
    body: "“Clear tracks made it easy to pick sessions for my work. The recordings let the rest of the lab catch up on what they missed.”",
  },
  {
    name: "Karthik Reddy",
    username: "Research Engineer, Sample Physics Lab",
    body: "“Practical, honest and well run. Less hype, more method.”",
  },
  {
    name: "Ananya Das",
    username: "Principal Investigator, Sample Institute",
    body: "“Good mix of lab, field and computational work. The corridor conversations alone were worth the trip.”",
  },
  {
    name: "Vikram Shah",
    username: "Research Programme Manager, Sample Foundation",
    body: "“The Science & Society track gave us a clearer view of how funding decisions land in real labs. We are sending more people next year.”",
  },
  {
    name: "Meera Krishnan",
    username: "Climate Data Scientist, Sample Climate Centre",
    body: "“The Data & Methods track went deep on reproducibility. My group has already changed how we version our datasets and analysis code.”",
  },
  {
    name: "Imran Qureshi",
    username: "Early-Career Researcher, Sample Materials Lab",
    body: "“Well organised from check-in to the last session. My poster got more useful questions in an hour than in a year of lab meetings.”",
  },
];
