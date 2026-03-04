<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class ApiSecurityController extends AbstractController
{
    #[Route(path: '/api/login', name: 'api_login', methods: ['POST'])]
    public function login(): JsonResponse
    {
        // This method will not be executed unless the user sends the request without the required JSON structure.
        return $this->json(['message' => 'Missing credentials'], 401); 
    }

    #[Route(path: '/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
