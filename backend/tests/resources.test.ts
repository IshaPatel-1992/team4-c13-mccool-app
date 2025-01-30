import resources from '@/services/resourcesService';
import  Iresources  from '../src/interface/Iresources';

describe('resources.insertOne', () => {
  const resourcesService1 = new resources();

  it('Inserts a record for an article into the database', async () => {
    const dataR: Partial<Iresources> = {             
      title: "How to Lead Effectively",
      description: "A guide to effective leadership.",
      category: "Leadership",
      contentType: "article" as const,
      content: "This is a detailed guide on leadership strategies and principles.",
      contentURL: [],
      thumbnailURL: ["https://google.com/leadership-guide.jpg", "https://google.com/leadership-guide.png"],
      author: "Isha Patel",
      publishedDt: new Date("2025-01-01") ,
      tags: ["leadership", "motivation", "leader", "lead"],
      enterBy: 'Isha',
      enterDt: new Date(),
      modifyBy: 'Stanley',
      modifyDt: new Date(),
      isEnabled: true,
    };


    const result = await resourcesService1.insertOne(dataR);
    expect(result).not.toBeUndefined(); // Ensure result exists
    expect(result).toHaveProperty('title', dataR.title);
    expect(result.content).toBe(dataR.content);
    expect(result.contentURL).toEqual([]); // Should be an empty array
  });

  it('Inserts a record for a video into the database', async () => {
    const dataR: Partial<Iresources> = {             
      title: "Simon Sinek’s guide to leadership | MotivationArk",
      description: "An insightful leadership guide.",
      category: "Leadership",
      contentType: "video" as const,
      contentURL: ["https://www.youtube.com/embed/eXDNkwIeOqA"],
      thumbnailURL: ["https://google.com/leadership-video.jpg"],
      author: "John Doe",
      publishedDt: new Date("2024-08-29"),
      tags: ["leadership", "strategy"],
      enterBy: 'John',
      enterDt: new Date(),
      modifyBy: 'Admin',
      modifyDt: new Date(),
      isEnabled: true,
    };
  
    const result = await resourcesService1.insertOne(dataR);
    expect(result).not.toBeUndefined(); // Ensure result exists
    expect(result).toHaveProperty('title', dataR.title);
    expect(result.contentURL).toEqual(dataR.contentURL);
    
    // Ensure content is undefined or empty for videos
    expect(result.content).toBeUndefined(); // content should not exist for video type
  });

  it('Inserts a record for a podcast into the database', async () => {
    const dataR: Partial<Iresources> = {             
      title: "The Tim Ferriss Show",
      description: "An insightful podcast on leadership.",
      category: "Leadership",
      contentType: "podcast" as const,
      contentURL: ["https://open.spotify.com/embed-podcast/show/2zQf1p9lZUe5r6W9Kv8ZcM"],
      thumbnailURL: ["https://google.com/leadership-podcast.jpg"],
      author: "John Doe",
      publishedDt: new Date("2024-06-25"),
      tags: ["leadership", "strategy"],
      enterBy: 'Stanley',
      enterDt: new Date(),
      modifyBy: 'Admin',
      modifyDt: new Date(),
      isEnabled: true,
    };
  
    const result = await resourcesService1.insertOne(dataR);
    expect(result).not.toBeUndefined(); // Ensure result exists
    expect(result).toHaveProperty('title', dataR.title);
    expect(result.contentURL).toEqual(dataR.contentURL);
    
    // Ensure content is undefined or empty for videos
    expect(result.content).toBeUndefined(); // content should not exist for video type
      
});

it('Inserts a record for a book into the database', async () => {
  const dataBook: Partial<Iresources> = {             
    title: "How to Manage team conflicts",
    description: "A guide to manage team conflicts.",
    category: "Leadership",
    contentType: "book" as const, // Content type is book
    content: "This is a detailed guide on leadership strategies and principles. It will help you to manage team conflicts effectively.",
    contentURL: [], // No URL for book content
    thumbnailURL: ["https://google.com/leadership-guide.jpg", "https://google.com/leadership-guide.png"],
    author: "Isha Patel",
    publishedDt: new Date("2025-01-01"),
    tags: ["leadership", "motivation", "leader", "lead", "team", "conflict"],
    enterBy: 'Isha',
    enterDt: new Date(),
    modifyBy: 'Stanley',
    modifyDt: new Date(),
    isEnabled: true,
  };

  const result = await resourcesService1.insertOne(dataBook);
  expect(result).not.toBeUndefined(); // Ensure result exists
  expect(result).toHaveProperty('title', dataBook.title);
  expect(result.content).toBe(dataBook.content);
  expect(result.contentURL).toEqual([]); // Should be an empty array for book
});

it('Inserts a record for a book into the database', async () => {
  const dataBook: Partial<Iresources> = {             
    title: "How to Manage stress",
    description: "A guide to manage stress.",
    category: "Leadership",
    contentType: "book" as const, // Content type is book
    content: "This is a detailed guide on leadership strategies and principles. It will help you to manage stress effectively.",
    contentURL: ["https://www.amazon.ca/Compassionate-Mind-Approach-Lifes-Challenges/dp/1572248408"], // No URL for book content
    thumbnailURL: ["https://google.com/leadership-guide.jpg", "https://google.com/leadership-guide.png"],
    author: "Isha Patel",
    publishedDt: new Date("2025-01-01"),
    tags: ["leadership", "motivation", "leader", "lead", "stress", "management"],
    enterBy: 'Isha',
    enterDt: new Date(),
    modifyBy: 'Stanley',
    modifyDt: new Date(),
    isEnabled: true,
  };

  const result = await resourcesService1.insertOne(dataBook);
  expect(result).not.toBeUndefined(); // Ensure result exists
  expect(result).toHaveProperty('title', dataBook.title);
  expect(result.content).toBe(dataBook.content);
  expect(result.contentURL).toEqual([]); // Should be an empty array for book
});

});
