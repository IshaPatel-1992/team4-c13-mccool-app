import Resources from '@/services/resourcesService';
import Iresources from '../src/interface/Iresources';

describe('Resources.insertOne', () => {
  const resourcesService1 = new Resources();

  it('Inserts a record for an article into the database', async () => {
    const dataR: Partial<Iresources> = {             
      title: "Strategies for Effective Leadership",
      description: "A guide to effective leadership.",
      category: "Leadership",
      contentType: "article" as const,
      content: "This is a detailed guide on leadership strategies and principles.",
      contentURL: ["https://www.youtube.com/watch?v=FrleiZgYUOU"],
      thumbnailURL: ["https://google.com/leadership-guide.jpg", "https://google.com/leadership-guide.png"],
      author: "Isha Patel",
      publishedDt: new Date("2025-01-01"),
      tags: ["leadership", "motivation", "team", "strategies"],
      enterBy: 'Isha',
      enterDt: new Date(),
      modifyBy: 'Stanley',
      modifyDt: new Date(),
      isEnabled: true,
    };

    const result = await resourcesService1.insertOne(dataR);
    expect(result).not.toBeUndefined();
    expect(result).toHaveProperty('title', dataR.title);
    expect(result.content).toBe(dataR.content);
    expect(result.contentURL).toEqual(dataR.contentURL);
    expect(result.thumbnailURL).toEqual(dataR.thumbnailURL);
    expect(result.publishedDt).toEqual(dataR.publishedDt);
    expect(result.author).toBe(dataR.author);
  });

  it('Inserts a record for a video into the database', async () => {
    const dataR: Partial<Iresources> = {             
      title: "Simon Sinek’s guide to leadership | MotivationArk",
      description: "An insightful leadership guide.",
      category: "Leadership",
      contentType: "video" as const,
      content: "This video covers essential leadership skills.",
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
    expect(result).not.toBeUndefined();
    expect(result).toHaveProperty('title', dataR.title);
    expect(result.content).toBe(dataR.content);
    expect(result.contentURL).toEqual(dataR.contentURL);
    expect(result.thumbnailURL).toEqual(dataR.thumbnailURL);
  });

  it('Inserts a record for a podcast into the database', async () => {
    const dataR: Partial<Iresources> = {             
      title: "The Tim Ferriss Show",
      description: "An insightful podcast on leadership.",
      category: "Leadership",
      contentType: "podcast" as const,
      content: "In this podcast, Tim discusses leadership and success strategies.",
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
    expect(result).not.toBeUndefined();
    expect(result).toHaveProperty('title', dataR.title);
    expect(result.content).toBe(dataR.content);
    expect(result.contentURL).toEqual(dataR.contentURL);
    expect(result.thumbnailURL).toEqual(dataR.thumbnailURL);
  });

  it('Inserts a record for a book into the database', async () => {
    const dataBook: Partial<Iresources> = {             
      title: "How to Manage Team Conflicts",
      description: "A guide to managing team conflicts.",
      category: "Leadership",
      contentType: "book" as const,
      content: "This book helps you manage team conflicts effectively.",
      contentURL: ["https://example.com/book.pdf"],
      thumbnailURL: ["https://google.com/leadership-guide.jpg"],
      author: "Jane Doe",
      publishedDt: new Date("2025-01-01"),
      tags: ["leadership", "conflict"],
      enterBy: 'Isha',
      enterDt: new Date(),
      modifyBy: 'Stanley',
      modifyDt: new Date(),
      isEnabled: true,
    };

    const result = await resourcesService1.insertOne(dataBook);
    expect(result).not.toBeUndefined();
    expect(result).toHaveProperty('title', dataBook.title);
    expect(result.content).toBe(dataBook.content);
    expect(result.contentURL).toEqual(dataBook.contentURL);
    expect(result.thumbnailURL).toEqual(dataBook.thumbnailURL);
  });

});
