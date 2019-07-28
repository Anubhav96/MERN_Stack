const expres = require('express');
const router = expres.Router();
const auth = require('../../middleware/auth');
const profileController = require('../../controllers/profile');
const profileValidation = require('../../validation/profile');

/* 
@route      GET api/profile/me
@desc       Get current user's profile
@access     Private
*/
router.get('/me', auth, profileController.getLoggedInUsersProfile);

/* 
@route      POST api/profile/
@desc       Gcreate / update user's profile
@access     Private
*/
router.post(
    '/',
    auth,
    profileValidation.validate('createOrUpdateProfile'),
    profileController.createOrUpdateProfile
);

/* 
@route      GET api/profile
@desc       Get all profiles
@access     Public
*/
router.get('/', profileController.getAllProfiles);

/* 
@route      GET api/profile/user/:userId
@desc       Get profile for respective user
@access     Public
*/
router.get('/user/:userId', profileController.getProfileByUserId);

/* 
@route      DELETE api/profile
@desc       delete profile, user & post
@access     private
*/
router.delete('/', auth, profileController.deleteProfileAndUser);

/* 
@route      PUT api/profile/experience
@desc       Add profile experiece
@access     private
*/
router.put(
    '/experience',
    auth,
    profileValidation.validate('addExperience'),
    profileController.addExperince
);

/* 
@route      DELETE api/profile/experience/:experienceId
@desc       Delete profile experiece
@access     private
*/
router.delete(
    '/experience/:experienceId',
    auth,
    profileController.deleteExperince
);

/* 
@route      PUT api/profile/education
@desc       Add profile education
@access     private
*/
router.put(
    '/education',
    auth,
    profileValidation.validate('addEducation'),
    profileController.addEducation
);

/* 
@route      DELETE api/profile/education/:educationId
@desc       Delete profile education
@access     private
*/
router.delete(
    '/education/:educationId',
    auth,
    profileController.deleteEducation
);

/* 
@route      DELEGETTE api/profile/github/:username
@desc       GET user repos from Github
@access     Public
*/
router.get('/github/:username', profileController.getGithubReposeByUsername);

module.exports = router;
