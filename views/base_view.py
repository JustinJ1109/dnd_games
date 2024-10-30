import pygame


class View:

    def __init__(self, screen: pygame.Surface, model, controller):
        self.model = model
        self.controller = controller
        self.screen = screen

        self.font = pygame.font.Font("freesansbold.ttf", 24)
        self.h1 = pygame.font.Font("freesansbold.ttf", 32)

        self.sprites = []
        self.__center = (self.screen.get_width() // 2, self.screen.get_height() // 2)

    def render(self):
        self.screen.fill("black")

    def add_sprite(self, *objs):
        for obj in objs:
            self.sprites.append(obj)
