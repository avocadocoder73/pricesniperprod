

async function getAllBlogSlugs()
{
  try {
        const resp = await fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/blogposts", { method: "GET" });
        
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        }

        let data = await resp.json();

        for(const item of data)
        {
          console.log(item.blogid)
        }
        
        return data
        
    } catch (err) {
        console.error("Fetch error:", err);
    }
  
}

async function getAllTrendingSlugs()
{
  try {
    const resp = await fetch("https://wy2zimbxu7.execute-api.us-east-2.amazonaws.com/trending", {method: "GET"})

    if(!resp.ok)
    {
      throw new Error(`HTTP error! Status: ${resp.status}`);
    }

    let data = await resp.json()

    return data
  }
  catch(err)
  {
    console.error("Fetch error:", err)
  }

  
}

export default async function sitemap()

{
  const siteUrl = 'https://peachyprices.com/';

  let blogPosts = await getAllBlogSlugs()

  let trending = await getAllTrendingSlugs()



  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0
    },
    {
      url: siteUrl + 'blog',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: siteUrl + 'terms',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6
    },
    ...blogPosts.map((slug) => ({
      url: `${siteUrl}blog/${slug.blogid}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7
    })),
    ...trending.map((slug) => ({
      url: `${siteUrl}search/${slug.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    }))
    
  ]
}

export async function getServerSideProps({ res }) {

  const siteUrl = 'https://peachyprices.com/';

  // Fetch all blog slugs dynamically
  const blogPosts = await getAllBlogSlugs(); // Example function

  // Build the XML structure
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/blog</loc>
    <priority>0.8</priority>
  </url>
   <url>
    <loc>${siteUrl}/terms</loc>
    <priority>0.7</priority>
  </url>
   <url>
    <loc>${siteUrl}/privacy</loc>
    <priority>0.6</priority>
  </url>
   <url>
    <loc>${siteUrl}/faq</loc>
    <priority>0.5</priority>
  </url>
  ${blogPosts
    .map(
      (slug) => `
  <url>
    <loc>${siteUrl}/blog/${slug.blogid}</loc>
    <priority>0.7</priority>
  </url>
  `
    )
    .join('')}
</urlset>`;

  // Set response headers
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
}

