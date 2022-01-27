const express = require('express');

const validateProfile = (profile) => {
  return profile
    && (!profile.firstName || typeof profile.firstName === 'string')
    && (!profile.lastName || typeof profile.lastName === 'string')
    && (!profile.photoSrc || typeof profile.photoSrc === 'string')
    && (!profile.hobbies || profile.hobbies.every((hobby) => typeof hobby.id === 'string' && typeof hobby.name === 'string'));
};

const registerApiRoutes = () => {
  const router = express.Router();

  let profile = {
    firstName: 'Alex',
    lastName: 'Maslovsky',
    photoSrc: 'https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF.jpg',
    hobbies: [
      { id: '1', name: 'guitar' },
      { id: '2', name: 'nature' },
      { id: '3', name: 'gaming' },
    ],
  };

  router.get('/profile', (request, response) => {
    response.send(profile);
  });

  router.put('/profile', (request, response) => {
    if (!validateProfile(request.body)) {
      response.status(400).send();

      return;
    }

    profile = {
      firstName: request.body.firstName || profile.firstName,
      lastName: request.body.lastName || profile.lastName,
      hobbies: request.body.hobbies || profile.hobbies,
      photoSrc: request.body.photoSrc || profile.photoSrc,
    };

    response.send(profile);
  });

  return router;
};

module.exports = registerApiRoutes;
