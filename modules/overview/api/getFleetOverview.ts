
// Get overview
const GET_FLEET_STATS = `
  query Overview {
    overview {
        totalVehicles
        activeNow
        inMaintenance
        fuelSpend
    }
}
`

export async function getFleetOverview() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 10000));

    const res = await fetch(process.env.GRAPHQL_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: GET_FLEET_STATS }),
    next: { revalidate: 60 } 
  });

  const json = await res.json();
  return json.data.overview[0]
  } catch (error) {
    console.log('Could not reach the graphql endpoint.')
    console.log(error)
    return error
  }
  
}