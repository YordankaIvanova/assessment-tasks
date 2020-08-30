# Solution

The solution is based on the Kendo UI framework.

The custom widget is written and designed based on the guidelines in the documentation 
and the core widgets in KendoUI Core public repo.

The developed custom accordion widget supports templates and can take in a data source. 
The styles are written in CSS (style.css). The widget also uses the Kendo Web Font Icons. 
Lastly, Kendo UI animations are supported by the custom widget.

# Animation

The accordion widget can be configured with an animation object. The animation object
defines the effects to be applied when an expand or collapse action is performed and the
duration of the animation itself. A default animation object is set for the widget with a 
default animation of `expand:vertical` for both expand and collapse actions.

# Demos

I have added two examples in the **/demos** folder:
* one with a custom template
* one with two separate accordions - one accordion with a custom animation and one with
default animation properties.