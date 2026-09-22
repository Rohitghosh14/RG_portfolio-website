export const handler = async (event, context) => {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing GitHub Token" }),
    };
  }

  const query = `
    query {
      user(login: "Rohitghosh14") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (result.errors) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: result.errors[0].message }),
      };
    }

    const calendar = result.data.user.contributionsCollection.contributionCalendar;
    
    // Flatten all days
    const allDays = [];
    for (const week of calendar.weeks) {
      for (const day of week.contributionDays) {
        allDays.push(day);
      }
    }

    // Sort descending by date just in case
    allDays.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get last 30 days
    const last30Days = allDays.slice(0, 30).reverse(); // chronological for chart
    
    // Calculate total for last 30 days
    const totalCommits = last30Days.reduce((sum, day) => sum + day.contributionCount, 0);

    // Calculate current streak
    let streak = 0;
    // Iterate from most recent backwards
    for (const day of allDays) {
      if (day.contributionCount > 0) {
        streak++;
      } else {
        // Stop on first day with 0, UNLESS it's today and today has 0 (then streak might still be intact from yesterday? 
        // We'll just strictly say if 0, streak ends)
        if (streak > 0) {
           break;
        }
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        totalCommits,
        streak,
        dailyData: last30Days.map(d => ({ date: d.date, count: d.contributionCount })),
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
