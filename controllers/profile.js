const { validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const User = require('../models/User');
const request = require('request');
const config = require('config');

exports.getLoggedInUsersProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name', 'avatar']
        );

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found!' });
        }
        return res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error!');
    }
};

exports.createOrUpdateProfile = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        //Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) {
            profileFields.company = company;
        }
        if (website) {
            profileFields.website = website;
        }
        if (location) {
            profileFields.location = location;
        }
        if (bio) {
            profileFields.bio = bio;
        }
        if (status) {
            profileFields.status = status;
        }
        if (githubusername) {
            profileFields.githubusername = githubusername;
        }
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        profileFields.social = {};
        if (youtube) {
            profileFields.social.youtube = youtube;
        }
        if (twitter) {
            profileFields.social.twitter = twitter;
        }
        if (facebook) {
            profileFields.social.facebook = facebook;
        }
        if (linkedin) {
            profileFields.social.linkedin = linkedin;
        }
        if (instagram) {
            profileFields.social.instagram = instagram;
        }

        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.send(profile);
        }
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error!');
    }
};

exports.getAllProfiles = async (req, res, next) => {
    try {
        const profiles = await Profile.find().populate('user', [
            'name',
            'avatar'
        ]);
        return res.json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error!');
    }
};

exports.getProfileByUserId = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.userId
        }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found!' });
        }
        return res.json(profile);
    } catch (error) {
        console.error(error);
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found!' });
        }
        res.status(500).send('Internal Server Error!');
    }
};

exports.deleteProfileAndUser = async (req, res, next) => {
    try {
        await Post.deleteMany({ user: req.user.id }); //Remove user post
        await Profile.findOneAndRemove({ user: req.user.id }); //Remove Profile
        await User.findOneAndRemove({ _id: req.user.id }); //Remove User
        return res.json({ msg: 'User Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error!');
    }
};

exports.addExperince = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        return res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error!');
    }
};

exports.deleteExperince = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience = profile.experience.filter(
            item => item._id != req.params.experienceId
        );
        await profile.save();
        return res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error!');
    }
};

exports.addEducation = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        };
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        return res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error!');
    }
};

exports.deleteEducation = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education = profile.education.filter(
            item => item._id != req.params.educationId
        );
        await profile.save();
        return res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error!');
    }
};

exports.getGithubReposeByUsername = async (req, res, next) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${
                req.params.username
            }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                'githubClientId'
            )}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'mode.js' }
        };
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Unable to connect!');
            }
            if (response.statusCode !== 200) {
                return res
                    .status(404)
                    .json({ msg: 'No github profile found!' });
            }
            return res.json(JSON.parse(body));
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error!');
    }
};
