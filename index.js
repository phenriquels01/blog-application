import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// List to store posts
let posts = [
    {
        id: 0,
        title: "Welcome",
        topic: "Introduction",
        name: "Pedro",
        date: "December 06, 2024",
        content: "This is an example of a post to demonstrate how the layout works. Feel free to create your own posts and interact with the website!",
    },
];


// GET Route for home page
app.get("/", (req, res) => {
    res.render("index.ejs", { posts, title: 'Pedro\'s Blog', subTitle: 'A Blog to Share Opinions.', headerImage: "assets/img/home.jpg"});
});


// GET Route for new post page
app.get("/new-post", (req, res) => {
    res.render("newPost.ejs", { title: 'Create a  New Post', subTitle: 'Speak your mind.', headerImage: "assets/img/newPost.jpg"});
});


// POST Route for saving new post
app.post('/new-post', (req, res) => {
    const { title, topic, name, content } = req.body;
    const date = new Date().toLocaleDateString('en', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const newPostId = posts.length > 1 ? Math.max(...posts.map(post => post.id)) + 1 : 1; 
    const newPost = { id: newPostId, title, topic, name, content, date };
    posts.unshift(newPost);
    
    res.redirect('/');
});


// GET Route to read a especific post
app.get("/post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId); 
    if (post) {
        const isWelcomePost = post.id === 0;
        res.render("post.ejs", { 
            title: post.title, 
            subTitle: post.topic,
            headerImage: "/assets/img/post.jpg",
            post,
            isWelcomePost 
        });
    } else {
        res.send("Post não encontrado");
    }
});


// GET Route for editing posts
app.get("/edit-post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId); 
    if (!post) {
        return res.redirect('/new-post');
    }

    res.render("editPost.ejs", {
        post,
        postId,
        title: 'Edit Your Post',
        subTitle: 'Speak your mind. Again.',
        headerImage: "/assets/img/editPost.jpg"
    });
});


// POST Route for saving edited posts
app.post("/edit-post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content, topic, name } = req.body;

    const post = posts.find(p => p.id === postId);

    if (post) {

        post.title = title;
        post.content = content;
        post.topic = topic;
        post.name = name;

        res.redirect(`/post/${postId}`);
    } else {
        res.send("Post não encontrado");
    }
});


// POST Route for deleting a post
app.post('/delete-post/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    if (postId === 0) {
        return res.redirect('/');
    }
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
});


// GET Route for contact page
app.get("/contact", (req, res) => {
    res.render("contact.ejs", { title: 'Contact me', subTitle: 'You have questions? I have answers.',  headerImage: "assets/img/contact.jpg"});
});


app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});
