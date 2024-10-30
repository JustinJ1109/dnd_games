import pygame

from views.base_view import View
from views.components.screen_components import TextInput


class MenuView(View):
    def __init__(self, screen, model, controller):
        super().__init__(screen, model, controller)

        self.add_sprite(
            TextInput(
                self.screen.get_width() // 2,
                100,
                60,
                self.font.get_height() + 10,
                self.font,
                (100, 100, 100),
                (200, 200, 200),
                "white",
                validation_func=lambda x: x.isnumeric(),
                on_save_cb=self.model,
            )
        )

    def render(self):
        super().render()
        for s in self.sprites:
            s.render(self.screen)
