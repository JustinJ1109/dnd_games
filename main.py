import pygame
from typing import TYPE_CHECKING

from screen_states import ScreenStates

from views.components.screen_components import TextInput

from views.menu import MenuView
from views.fiends_favor import FiendsFavorView

from models.menu import MenuModel
from models.fiends_favor import FiendsFavorModel

if TYPE_CHECKING:
    from views.base_view import View
    from models.base_model import Model
SCREEN_WIDTH = 1600
SCREEN_HEIGHT = 900


class Game:
    def __init__(self):
        pygame.init()
        self.running = False
        self.view: View = None
        self.model: Model = None

        self.screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))

        self.__models = {
            ScreenStates.MENU: MenuModel(),
            ScreenStates.FIENDS_FAVOR: FiendsFavorModel(),
        }

        self.__views = {
            ScreenStates.MENU: MenuView(
                self.screen, self.__models[ScreenStates.MENU], self
            ),
            ScreenStates.FIENDS_FAVOR: FiendsFavorView(
                self.screen, self.__models[ScreenStates.FIENDS_FAVOR], self
            ),
        }

    def set_screen(self, screen_state: ScreenStates):
        self.model = self.__models[screen_state]
        self.view = self.__views[screen_state]

    def start(self):
        self.running = True
        self.set_screen(ScreenStates.FIENDS_FAVOR)

        active_sprite = None

        while self.running:
            for event in pygame.event.get():
                if event.type == pygame.MOUSEBUTTONUP:
                    pos = pygame.mouse.get_pos()
                    clicked_sprites = [
                        s for s in self.view.sprites if s.rect.collidepoint(pos)
                    ]
                    if clicked_sprites:
                        for s in clicked_sprites:
                            if isinstance(s, TextInput):
                                if active_sprite and active_sprite != s:
                                    active_sprite.deactivate()
                                active_sprite = s if not s.active else None
                                s.toggle_active()
                            pass
                    elif active_sprite is not None:
                        if isinstance(active_sprite, TextInput):
                            active_sprite.deactivate()
                            active_sprite = None

                if event.type == pygame.KEYDOWN:
                    if active_sprite:
                        if isinstance(active_sprite, TextInput):
                            if event.key == pygame.K_BACKSPACE:
                                active_sprite.remove_character()
                            elif event.key == pygame.K_RETURN:
                                active_sprite.deactivate()
                                active_sprite = None
                            else:
                                char = event.unicode
                                if char.isprintable():
                                    active_sprite.add_character(char)

                if event.type == pygame.QUIT:
                    self.running = False
                    continue
            self.view.render()
            pygame.display.flip()
        pygame.quit()


if __name__ == "__main__":
    g = Game()
    g.start()
