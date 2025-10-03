import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import { Heart } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      })
      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const imageLikeToggle = async (id) => {
    try {
   const { data } = await axios.post('/api/user/get-like-creations', { id }, {
  headers: { Authorization: `Bearer ${await getToken()}` }
})


      if (data.success) {
        // Update likes locally
        setCreations((prev) =>
          prev.map((c) =>
            c.id === id
              ? {
                  ...c,
                  likes: c.likes.includes(user.id)
                    ? c.likes.filter((uid) => uid !== user.id)
                    : [...c.likes, user.id],
                }
              : c
          )
        )
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) fetchCreations()
  }, [user])

  if (loading) {
    return <div className="flex-1 h-full flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-xl font-semibold">Creations</h1>

      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll p-3 flex flex-wrap gap-3">
        {creations.map((creation) => (
          <div key={creation.id} className="relative group w-full sm:w-1/2 lg:w-1/3 rounded-lg overflow-hidden">
            <img src={creation.content} alt="Generated creation" className="w-full h-full object-cover" />

            <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm text-white mb-2">{creation.prompt}</p>
              <div className="flex items-center gap-2 text-white">
                <p>{creation.likes.length}</p>
                <Heart
                  onClick={() => imageLikeToggle(creation.id)}
                  className={`h-5 w-5 cursor-pointer transition-transform hover:scale-110 ${
                    creation.likes.includes(user.id) ? 'fill-red-500 text-red-600' : 'text-white'
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Community
