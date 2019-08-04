export { setAlert } from './alert';
export { register, loadUser, login, logout } from './auth';
export {
    getCurrentProfile,
    createProfile,
    addExperience,
    addEducation,
    deleteExperience,
    deleteEducation,
    deleteAccount,
    getAllProfiles,
    getProfileById,
    getGithubRepos
} from './profile';

export {
    getPosts,
    addLike,
    removeLike,
    deletePost,
    addPost,
    getPost,
    deleteComment,
    addComment
} from './post';
