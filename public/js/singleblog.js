const submitUpdatedBlog = document.querySelector('#submit-updated-blog')
const deleteBlog = document.querySelector('.delete-blog')
const updateBlog = document.getElementById('update-id')

const delSingButtonHandler = async (event) => {
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


const updateFormHandler = async (event) => {
    event.preventDefault()
    const updateId = event.currentTarget.getAttribute("updateId")
    console.log(event.currentTarget.getAttribute("updateId"))

    const updateForm = document.getElementById('update-blog-form')

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
            document.location.reload();
          } else {
            alert('Failed to Update blog');
          }
    }}

updateBlog.addEventListener('click', updateFormHandler)

submitUpdatedBlog.addEventListener('click',
  submitFormHandler
)
deleteBlog.addEventListener('click', delSingButtonHandler);
