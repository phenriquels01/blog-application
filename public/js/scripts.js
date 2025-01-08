window.addEventListener('DOMContentLoaded', () => {

    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        
        if (currentTop < scrollPos) {
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            mainNav.classList.remove('is-visible');
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
});


document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const postId = e.target.closest('button').getAttribute('data-post-id');
            document.getElementById('confirmDeleteBtn').setAttribute('data-post-id', postId);
            new bootstrap.Modal(document.getElementById('deleteModal')).show();
        });
    });

    document.getElementById('confirmDeleteBtn').addEventListener('click', () => {

        const postId = document.getElementById('confirmDeleteBtn').getAttribute('data-post-id');
        
        fetch(`/delete-post/${postId}`, {
            method: 'POST',
        })
        .then(response => {
            if (response.ok) {
                new bootstrap.Modal(document.getElementById('deleteModal')).hide();
                window.location.reload();
            } else {
                alert("Error trying to delete post");
            }
        });
    });
});

function date() {
    return new Date().getFullYear();
}

window.onload = function() {
    const copyrightDiv = document.querySelector('.small.text-center.text-muted.fst-italic');
    copyrightDiv.innerHTML = `&copy; ${date()} Pedro Siqueira. All rights reserved.`;
};