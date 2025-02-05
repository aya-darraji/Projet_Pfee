const os = require('os');

module.exports.getOsInformation = async (req,res) =>{
    try {
        
        const osInformations = {
            hostname: os.hostname(),
            type: os.type(),
            platform: os.platform(),
          };

          if(!osInformations){
            throw new Error("there is no information for your os")
          }

        res.status(200).json(osInformations);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}