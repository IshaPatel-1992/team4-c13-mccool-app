import DataAccess from "@/databaseAccess/dataAccess";
import Iresources from "@/interface/Iresources";
import resourcesModel from "@/models/resourcesModel";
import resources from '@/services/resources';


describe('resources.insertOne', () => {
  const resourcesService1 = new resources();
  it('Insert record for Resources in to the database', async () => {
    const dataR = {             
            title: "How to Lead Effectively",
            description: "A guide to effective leadership.",
            category: "Leadership",
            contentType: "article", // "video", "book"
            contentURL: ["https://google.com/leadership-guide1","https://google.com/leadership-guide2"],
            thumbnailURL: ["https://google.com/leadership-guide.jpg","https://google.com/leadership-guide.png"],
            author: "Isha Patel",
            publishedDt: "2025-01-01",
            tags: ["leadership", "motivation","leader","lead"],
            enterBy: 'Isha',
            enterDt: new Date(),
            modifyBy: 'Stanley',
            modifyDt: new Date(),
            isEnabled: true,
    };
  
    const result = await resourcesService1.insertOne(dataR);   
    expect(result).toHaveProperty('title', dataR.title);
    expect(result.title).toBe(dataR.title);
  })
})