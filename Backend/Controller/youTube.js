import YoutubeMusicApi from 'youtube-music-api'
export const searchSuggestions = async(req,res)=>{
    const api = new YoutubeMusicApi()
api.initalize() // Retrieves Innertube Config
.then(info => {
	api.getSearchSuggestions("teri meri bodyguard").then(result => {
		/*[
		  'ne deve ne kush',
		  'ne deve ne kush canlı',
		  'ne deve ne kush lyrics',
		  'ne deve ne kush konser',
		  'ne deve ne kush cover',
		  'ne deve ne kush sözleri',
		  'ne deve ne kush akor'
		]*/
		console.log(result)
	})
}
)
    res.send("Search Suggestions");
}