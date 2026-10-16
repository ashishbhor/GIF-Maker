import { useDispatch, useSelector } from 'react-redux';
import { fetchGIF, fetchPhotos, fetchVideos } from '../api/mediaApi';
import { setQuery, setLoading, setError, setResults } from '../redux/Features/searchSlice'
import { useEffect } from 'react';


function ResultGride() {

    const dispatch = useDispatch()
    const { query, activeTab, results, loading, error } = useSelector((store) => store.search)
    
    
    useEffect(() => {
        const getData = async () => {
        let data
        if (activeTab == 'photos') {
            let response = await fetchPhotos(query)
            data = response.results.map((item) => ({
                id: item.id,
                type:'photo',
                title: item.alt_description,
                thumbnail:item.urls.small,
                src: item.urls.full
            }))
        }
        if (activeTab == 'videos') {
            let response = await fetchVideos(query)
            data=response.videos.map((item) => ({
                id: item.id,
                type:'videos',
                title: item.user.name || 'video',
                thumbnail:item.image,
                src: item.video_files[2].link
            }))
        }
        if (activeTab == 'gif') {
            let response = await fetchGIF(query)
            data = response.data.map((item) => ({
                id:item.id,
                type:'gif',
                title: item.title || 'GIF',
                thumbnail:item?.user?.avatar_url || item.images?.fixed_width?.url,
                src: item.url
            })) 
            }
            console.log(data);
            
    }
        getData()
    },[query,activeTab])
return (
    <div>
    </div>
  )
}

export default ResultGride