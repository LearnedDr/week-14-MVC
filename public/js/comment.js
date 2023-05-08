const commentSubmitButton = document.getElementById('commentSubmit');
const updateCommentBtns = document.querySelectorAll('[id=update-comment-id]');
const submitUpdatedCommentBtns = document.querySelectorAll('[id=updateCommentSubmit]')
const commentList = document.querySelector('.comment-list');


const commentSubmit = async (event) => {
    event.preventDefault();
  
    const contents = document.querySelector('#commentText').value.trim();
    if (contents) {
      const response = await fetch(window.location.pathname, {
        method: 'POST',
        body: JSON.stringify({ contents }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(window.location.pathname);
      } else {
        alert('Please check that you have filled all required fields');
      }
    }
  };

  const getUpdateBlogForm = (id) => {
    return document.getElementById(`update-comment-form-${id}`);
}

  const updateCommentFormHandler = async (event) => {
    event.preventDefault()
    const updateCommentId = event.currentTarget.getAttribute("updateCommentId")
    const updateForm = getUpdateBlogForm(updateCommentId)
   if (event.currentTarget.hasAttribute('updateCommentId')){
    event.currentTarget.classList.add('d-none');
    updateForm.classList.remove('d-none');
   }
}

const submitUpdateCommentFormHandler = async (event) => {
  event.preventDefault()

  
  const id = event.currentTarget.getAttribute('updateId');
      const contents = document.getElementById(`commentText-update-${id}`).value.trim()
      if (contents && id) {
      const response = await fetch(`/api/comment/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ id, contents }),
          headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
         document.location.reload();
        } else {
          alert('Failed to Update comments');
        }
  }}

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('deleteCommentId')) {
      const id = event.target.getAttribute('deleteCommentId');
      const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload()
      } else {
        alert('Failed to delete comment');
      }
    }
  };

updateCommentBtns.forEach(el => el.addEventListener('click',
  updateCommentFormHandler
))
submitUpdatedCommentBtns.forEach(el => el.addEventListener('click',
    submitUpdateCommentFormHandler
))
commentSubmitButton.addEventListener('click', commentSubmit);
commentList.addEventListener('click', delButtonHandler);