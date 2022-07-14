const tmpSurveys = [
    {
      id : 100,
      title : "My Channel YouTube channel content",
      slug : "my-channel-youtube-channel-content",
      status : "draft",
      image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeCMppcJ0CI3jIXYPTjndGS_bJRT99fYcALw&usqp=CAU",
      description : "My name is Furkan. <br> Frontend Developer.",
      created_at : "2022-06-10 18:00:00",
      updated_at : "2022-06-10 18:00:00",
      expire_date : "2022-06-30 18:00:00",
      questions : [
        {
          id : 1,
          type : "select",
          question : "From which country are you?",
          description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
          data: {
            options: [
              { uuid : "1231239127471871", text: "USA" },
              { uuid : "1231526636346346", text: "Germany" },
              { uuid : "1231239127413566", text: "India" },
              { uuid : "1231239127476894", text: "Turkey" },
              { uuid : "1231239127470001", text: "France" },
            ]
          }
        },
        {
          id : 2,
          type : "checkbox",
          question : "Which language videos do you want to see on my channel?",
          description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
          data: {
            options: [
              { uuid : "1231239127471871", text: "JavaScript" },
              { uuid : "1231526636346346", text: "PHP" },
              { uuid : "1231239127413566", text: "C#" },
              { uuid : "1231239127476894", text: "Java" },
              { uuid : "1231239127470001", text: "Golang" },
            ]
          }
        },
        {
          id : 4,
          type : "radio",
          question : "Which laravel Framework do you love most?",
          description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
          data: {
            options: [
              { uuid : "1231239127471871", text: "Laravel 5" },
              { uuid : "1231526636346346", text: "Laravel 6" },
              { uuid : "1231239127413566", text: "Laravel 7" },
              { uuid : "1231239127476894", text: "Laravel 8" },
              { uuid : "1231239127470001", text: "Laravel 8" },
            ]
          }
        },
        {
          id : 5,
          type : "checkbox",
          question : "What type of projects do you want to see on  my channel built with laravel?",
          description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
          data: {
            options: [
              { uuid : "1231239127471871", text: "REST API" },
              { uuid : "1231526636346346", text: "E-commerce" },
              { uuid : "1231239127413566", text: "Real Estate" },
              { uuid : "1231239127476894", text: "All of the above" },
            ]
          }
        },
        {
          id : 6,
          type : "text",
          question : "What's your favorite Youtube channel?",
          description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
          data: {}
        },    
        {
          id : 7,
          type : "textarea",
          question : "What dou you think about Learn Vue channel?",
          description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
          data: {}
        },    
      ],
    },
    {
      id : 200,
      title : "JavaScript Learn",
      slug : "javascript-learn",
      status : "active",
      image : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png",
      description : "Javascript love.",
      created_at : "2022-06-10 18:00:00",
      updated_at : "2022-06-10 18:00:00",
      expire_date : "2022-06-30 18:00:00",
      questions : [],
    },
    {
      id : 300,
      title : "Tailwind CSS",
      slug : "tailwind-css",
      status : "active",
      image : "https://laravelnews.imgix.net/images/tailwindcss-1633184775.jpg?ixlib=php-3.3.1",
      description : "Tailwind css framework.",
      created_at : "2022-06-10 18:00:00",
      updated_at : "2022-06-10 18:00:00",
      expire_date : "2022-06-30 18:00:00",
      questions : [],
    },
    {
      id : 400,
      title : "Vue 3",
      slug : "vue-3",
      status : "active",
      image : "https://cdn.yazilim.net/files/uploads/default/vue-3-yayinlandi-0a469af0f66fc7f78651.png",
      description : "Vue js javascript framework",
      created_at : "2022-06-10 18:00:00",
      updated_at : "2022-06-10 18:00:00", 
      expire_date : "2022-06-30 18:00:00",
      questions : [],
    },
  ]