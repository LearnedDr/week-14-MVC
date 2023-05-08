const blogSubmit = document.getElementById('submitBlog');
const createNewBlogBtn = document.getElementById('createNewBlog');
const newBlogForm = document.getElementById('newBlogForm');
const blogList = document.querySelector('.blog-list');
const updateBlogBtns = document.querySelectorAll('[id=update-id]');
const submitUpdatedBlogBtns = document.querySelectorAll('[id=submit-updated-blog]')

const blogPostSubmit = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blogTitleInput').value.trim();
    const contents = document.querySelector('#blogContentInput').value.trim();
    if (title && contents) {
      const response = await fetch('/api/blogpost', {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Please check that you have filled all required fields');
      }
    }
  };

const handleBlogForm = (event) => {
createNewBlogBtn.classList.add('d-none');
newBlogForm.classList.remove('d-none');

}

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('delete-id')) {
      const id = event.target.getAttribute('delete-id');
      console.log(id)
      const response = await fetch(`/api/blogpost/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
      }
    }
  };


const getUpdateBlogForm = (id) => {
    return document.getElementById(`update-blog-form-${id}`);
}

const updateFormHandler = async (event) => {
    event.preventDefault()
    const updateId = event.currentTarget.getAttribute("updateId")
    console.log(event.currentTarget.getAttribute("updateId"))

    const updateForm = getUpdateBlogForm(updateId)

   if (event.currentTarget.hasAttribute('updateId')){
    event.currentTarget.classList.add('d-none');
    updateForm.classList.remove('d-none');
   }
}

const submitFormHandler = async (event) => {
    event.preventDefault()
 
    
    const id = event.currentTarget.getAttribute('updateId');
        const title = document.getElementById(`blogTitleUpdate-${id}`).value.trim()
        const contents = document.getElementById(`blogContentUpdate-${id}`).value.trim()
        if (title && contents && id) {
        const response = await fetch(`/api/blogpost/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, title, contents }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to Update blog');
          }
    }}


  
createNewBlogBtn.addEventListener('click', handleBlogForm);
blogSubmit.addEventListener('click', blogPostSubmit);
blogList.addEventListener('click', delButtonHandler);
updateBlogBtns.forEach(el => el.addEventListener('click',
    updateFormHandler
))

submitUpdatedBlogBtns.forEach(el => el.addEventListener('click',
    submitFormHandler
))