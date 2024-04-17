const run = async () => {
  console.log('Running cron job')
  await new Promise((resolve) => {
    setTimeout(resolve, 10000)
  })
}

run().then(() => {
  console.log('Cron job completed')
  process.exit(0)
}).catch(() => {
  console.error('Error running cron job')
  process.exit(1)
})