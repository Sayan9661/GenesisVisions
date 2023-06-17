import React from 'react'
import { useState,useEffect } from 'react'
import {Loader, Card,FormField} from '../components'

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');


  // this renders the cards for displaying the posts/pics
  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post)=>
  <Card key={post._id}{...post} />
      )
    }

    return (
      <h2 className='mt-5 font-bold text-[#6449ff] text-xl
      uppercase'>{ title }</h2>
    )

  }



  return (
    
    <section>
      <div>
        <h1 className="font-extrabold text-[#222328] 
        text-[32px]">Public Gallery</h1>
        <p className="mt-2 text-[#666e75] text-[16px] 
        max-w[500px]">
          Let's take a look at what the other's generated
          on the platform
        </p>
      </div>
      
      <div className="mt-16">
        <FormField />
      </div>

      {/* display the post pictures  */}

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (<>
            {/* if there is a searchtext show the pics */}
            {searchText && (
              <h2 className='font-medium text-[#666e75]
              text-xl mb-3'>Search Results
              <span className='text-[#222328]'>{searchText}
                </span>
              </h2>  
            )}
            <div className='grid lg:grid-cols-4 
            sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards data={[]}
                  title="No search Results found" />):
                (
                  <RenderCards data={[]}
                  title="No posts found"/>
                )
              }
            </div>
          </>)
        }
      </div>
    </section>
  )
}

export default Home