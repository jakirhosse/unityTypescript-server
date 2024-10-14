import cors from 'cors'

// parsers
app.use(express.json())
app.use(cors())

// routers
app.use('/api', UserRoutes)
app.use('/api', TeamRoutes)

//! error handler
app.use(globalError)

app.get('/', (req, res) => {
  res.send('Server running')
})

export default app