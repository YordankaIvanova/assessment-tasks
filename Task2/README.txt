# Solution

The solution leverages CSS media queires and Flexbox. I have used the SCSS preprocessor
and the Font Awesome icons library.

The styles are placed in the **/styles** folder. I contains separet files for variables
(colors), common styles(styles.scss), flex layout(flexbox properties) and media queries(
rules for different resolutions).

For convinience, I have also commited the compurted CSS styles in the **/styles** folder.

# Responsive design

1. Larger than 769px screen width (resolution for tablets) I have decided to place 
appointments one below the other. The same is done for the buttons - the buttons are
larger and on a smaller device would be easier to press with a finger.

2. After 1025px screen width (resolution for laptops, small screens) I have placed two
buttons per row.

3. After 1210px - the buttons are three in row as the screen is larger and the buttons
can be selected with ease as well.

Larger screen resolutions up to 3840 x 2160 px are supported with the current design.

# Demos

I have added 3 demos in the folder **/demos** - hardest(10 appointments and 9 buttons),
simplest case(no appointments and buttons) and the design from the example image - 
3 appointments and 4 buttons.