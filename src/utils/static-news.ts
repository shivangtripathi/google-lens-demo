interface INews { 
    title: string;
    image: string;
    author: string;
    date: string;
    authorImage: string;
}


const RECENT_NEWS: INews[] = [
    {
      "title": "Tech Giants Announce Breakthrough in Quantum Computing",
      "image": `https://picsum.photos/200/300?${Math.random() * 1000}`,
      "author": "Aarav Singh",
      "date": "2025-01-05",
      "authorImage": `https://picsum.photos/200/300?${Math.random() * 1000}`
    },
    {
      "title": "Global Markets Surge Amid AI-Powered Financial Predictions",
      "image": `https://picsum.photos/200/300?${Math.random() * 1000}`,
      "author": "Meera Shah",
      "date": "2025-01-04",
      "authorImage": `https://picsum.photos/200/300?${Math.random() * 1000}`
    },
    {
      "title": "Revolutionary EV Battery Promises 1,000-Mile Range",
      "image": `https://picsum.photos/200/300?${Math.random() * 1000}`,
      "author": "Rohan Gupta",
      "date": "2025-01-03",
      "authorImage": `https://picsum.photos/200/300?${Math.random() * 1000}`
    },
    {
      "title": "Space Tourism Gets a Boost with New Affordable Packages",
      "image": `https://picsum.photos/200/300?${Math.random() * 1000}`,
      "author": "Sanya Kapoor",
      "date": "2025-01-02",
      "authorImage": `https://picsum.photos/200/300?${Math.random() * 1000}`
    },
    {
      "title": "Breakthrough Gene Therapy Cures Rare Genetic Disorder",
      "image": `https://picsum.photos/200/300?${Math.random() * 1000}`,
      "author": "Karan Malhotra",
      "date": "2025-01-01",
      "authorImage": `https://picsum.photos/200/300?${Math.random() * 1000}`
    },
    {
      "title": "AI-Generated Art Sparks Debate Among Creatives",
      "image": `https://picsum.photos/200/300?${Math.random() * 1000}`,
      "author": "Ananya Iyer",
      "date": "2024-12-30",
      "authorImage": `https://picsum.photos/200/300?${Math.random() * 1000}`
    },
    {
      "title": "Top 5 Destinations for Digital Nomads in 2025",
      "image": `https://picsum.photos/200/300?${Math.random() * 1000}`,
      "author": "Rajiv Menon",
      "date": "2024-12-29",
      "authorImage": `https://picsum.photos/200/300?${Math.random() * 1000}`
    },
    {
      "title": "Blockchain Technology Poised to Revolutionize Healthcare",
      "image": `https://picsum.photos/200/300?${Math.random() * 1000}`,
      "author": "Neha Joshi",
      "date": "2024-12-28",
      "authorImage": `https://picsum.photos/200/300?${Math.random() * 1000}`
    },
    {
      "title": "India's Tech Sector Gears Up for a Green Revolution",
      "image": `https://picsum.photos/200/300?${Math.random() * 1000}`,
      "author": "Aditya Reddy",
      "date": "2024-12-27",
      "authorImage": `https://picsum.photos/200/300?${Math.random() * 1000}`
    },
    {
      "title": "Record-Breaking Rainfall Disrupts Global Supply Chains",
      "image": `https://picsum.photos/200/300?${Math.random() * 1000}`,
      "author": "Ishita Desai",
      "date": "2024-12-26",
      "authorImage": `https://picsum.photos/200/300?${Math.random() * 1000}`
    }
  ]
  
export { RECENT_NEWS, INews };