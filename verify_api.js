// Built-in fetch in Node.js 18+

const API_KEY = "pub_7de0e204099d4a25981b0d337ba75317";
const API_URL = "https://newsdata.io/api/1/latest";

async function verifyApi() {
  console.log("1. Testing Initial Fetch...");
  const initialUrl = `${API_URL}?apikey=${API_KEY}&q=everything&language=en`;
  console.log("   URL:", initialUrl);
  
  try {
    const res1 = await fetch(initialUrl);
    const data1 = await res1.json();
    
    if (data1.status !== 'success') {
      console.error("   FAILED: Status is not success", data1);
      return;
    }
    
    console.log(`   SUCCESS: Found ${data1.totalResults} results.`);
    console.log(`   NextPage Cursor: ${data1.nextPage}`);
    
    if (data1.results && data1.results.length > 0) {
      const article = data1.results[0];
      console.log("   Sample First Article:");
      console.log(`   - Title: ${article.title}`);
      console.log(`   - Link: ${article.link}`);
      console.log(`   - Source: ${article.source_name}`);
    }

    if (data1.nextPage) {
      console.log("\n2. Testing Pagination (Next Page)...");
      const page2Url = `${initialUrl}&page=${data1.nextPage}`;
      console.log("   URL:", page2Url);
      
      const res2 = await fetch(page2Url);
      const data2 = await res2.json();
      
      if (data2.status !== 'success') {
         console.error("   FAILED: Pagination request failed", data2);
      } else {
         console.log(`   SUCCESS: Fetched page 2. Results count: ${data2.results?.length}`);
         const article2 = data2.results?.[0];
         if (article2) {
             console.log(`   - Page 2 First Article Title: ${article2.title}`);
         }
      }
    } else {
        console.log("   SKIPPING: No next page available to test.");
    }

  } catch (error) {
    console.error("   ERROR:", error);
  }
}

verifyApi();
