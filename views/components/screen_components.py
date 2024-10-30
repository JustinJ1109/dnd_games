import pygame


class BaseComponent:
    pass


class TextInput(pygame.sprite.Sprite):
    def __init__(
        self,
        x,
        y,
        width,
        height,
        font,
        text_color=(0, 0, 0),
        bg_color=(255, 255, 255),
        active_color=(0, 0, 0),
        locked=False,
        validation_func=None,
        on_save_cb: callable = None,
    ):
        super().__init__()
        self.rect = pygame.Rect(x, y, width, height)
        self.font = font
        self.text = ""
        self.text_color = text_color
        self.bg_color = bg_color
        self.active_color = active_color
        # self.invalid_color = (255, 0, 0)  # Optional color for invalid input
        self.color = self.bg_color
        self.active = False
        self.cursor_visible = True
        self.cursor_blink_time = 500  # milliseconds
        self.last_blink_time = pygame.time.get_ticks()
        self.locked = locked  # Lock state for interaction
        self.validation_func = validation_func  # Validation function (if any)
        self.is_valid = True  # Track validity state
        self.on_save_cb = on_save_cb

    def activate(self):
        if not self.locked:  # Only activate if not locked
            self.active = True
            self.color = self.active_color

    # TODO: audit log
    def deactivate(self):
        self.active = False
        self.color = self.bg_color

    def toggle_active(self):
        """Toggle the active state of the text input if not locked."""
        if not self.locked:
            if self.active:
                self.deactivate()
            else:
                self.activate()

    def add_character(self, char):
        """Add a character if active, validating based on width and optional validation function."""
        if self.active and not self.locked:
            potential_text = self.text + char
            text_width, _ = self.font.size(potential_text)
            if text_width < self.rect.width - 10:  # Leave padding for cursor
                # Temporarily add character and validate
                temp_text = self.text + char
                if not self.validation_func or self.validation_func(temp_text):
                    self.text = temp_text
                    self.is_valid = True
                else:
                    self.is_valid = False  # Mark as invalid if validation fails

    def remove_character(self):
        """Remove the last character in the input text if active."""
        if self.active and not self.locked:
            self.text = self.text[:-1]

    def set_locked(self, locked: bool):
        """Lock or unlock the text input."""
        self.locked = locked
        if locked:
            self.deactivate()  # Ensure input is deactivated when locked

    def update(self):
        """Handle cursor blinking."""
        current_time = pygame.time.get_ticks()
        if (
            self.active
            and current_time - self.last_blink_time >= self.cursor_blink_time
        ):
            self.cursor_visible = not self.cursor_visible
            self.last_blink_time = current_time

    def render(self, screen):
        # Draw input box, change color if text is invalid
        draw_color = self.color
        pygame.draw.rect(screen, draw_color, self.rect)

        # Render text
        text_surface = self.font.render(self.text, True, self.text_color)
        screen.blit(
            text_surface,
            (
                self.rect.x + 5,
                self.rect.y + (self.rect.height - text_surface.get_height()) // 2,
            ),
        )

        # Draw cursor if active and blinking
        if self.active and self.cursor_visible:
            cursor_x = self.rect.x + 5 + text_surface.get_width()
            cursor_y = self.rect.y + 5
            cursor_height = self.rect.height - 10
            pygame.draw.line(
                screen,
                self.text_color,
                (cursor_x, cursor_y),
                (cursor_x, cursor_y + cursor_height),
                2,
            )
