const navLinks = [
    {
      id: "/",
      title: "Home",
    },
    {
      id: "photo",
      title: "Latest Images",
    },
    {
      id: "category",
      title: "Category",
    },
  ];
  
  const features = [
    {
      icon:'fa-solid fa-image',
      title:'Stock Images',
      tag:'1000+ Images',
      link:'/photo'
    },
    {
      icon:'fa-solid fa-video',
      title:'Stock Video',
      tag:'100+ videos',
      link:'/'
    },
    {
      icon:'fa-solid fa-film',
      title:'Video Presets',
      tag:'100+ videos presets',
      link:'/'
    }
  ]
  const category = [
    {
      img:'./back.jpg',
      title:'Nature',
      link:'/category/nature'
    },
    {
      img:'./cat-lifestyle.jpg',
      title:'Lifestyle',
      link:'/category/lifestyle'
    },
    {
      img:'./anime-pic.jpg',
      title:'Anime World',
      link:'/category/Anime'
    },
    {
      img:'./cat-animals.jpg',
      title:'Animals',
      link:'/category/animals'
    },
    {
      img:'./cat-business.jpg',
      title:'Business',
      link:'/category/business'
    },
    {
      img:'./movies.jpg',
      title:'Movies',
      link:'/category/movies'
    },
  ]
  // Photo search filter
  const searchFilter = [
    {
      icon: 'fa-solid fa-heart',
      id:'most-liked',
      title:'Most Liked'
    },
    {
      icon: 'fa-solid fa-',
      id:'latest',
      title:'Latest'
    },
    {
      icon: 'fa-solid fa-',
      id:'oldest',
      title:'Oldest'
    },
  ]

  const testimonials = [
    {
      admin:'Harsh',
      post:'Web Developer',
      message:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim distinctio porro quasi provident eum recusandae quos assumenda quas, fuga ad!'
    },
    {
      admin:'Krishna',
      post:'Content Creator',
      message:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim distinctio porro quasi provident eum recusandae quos assumenda quas, fuga ad!'
    },
    {
      admin:'Tony Stark',
      post:'VFX Designer',
      message:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim distinctio porro quasi provident eum recusandae quos assumenda quas, fuga ad!'
    },
  ]
  const sideNavLinks = [
    {
      id:'/',
      icon:'fa-solid fa-grid-2',
      title:'Dashboard'
    },
    {
      id:'users',
      icon:'fa-solid fa-user',
      title:'Users'
    },
    {
      id:'posts',
      icon:'fa-solid fa-photo-film',
      title:'Posts'
    },
    {
      id:'settings',
      icon:'fa-solid fa-gears',
      title:'Settings'
    }
  ]
  export {navLinks,features,category, testimonials, searchFilter, sideNavLinks}
