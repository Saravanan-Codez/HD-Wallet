

const healthCheck = async (req, res) => {
  try {
    res.status(200).json({
      status: 'OK',
      message: 'Server is healthy'
    })
  } catch (error) {
    res.status(500).json(
      { error: 'Internal Server Error' });
  }
}

const getKeyPair = async (req, res) => {

}

module.exports = {
    getKeyPair,
    healthCheck
}