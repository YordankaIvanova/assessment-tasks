(function() {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        NS = ".kendoAccordion",
        COLLAPSE = "collapse",
        EXPAND = "expand",
        REVERSE = "reverse",
        PLAY = "play",

        // CSS class names
        ACCORDION_HEADER_COLLAPSED = "k-accordion-header-collapsed",
        ACCORDION_HEADER_EXPANDED = "k-accordion-header-expanded",
        ACCORDION_HEADER = "k-accordion-header",
        ACCORDION_CONTENT = "k-accordion-content",

        // ICONS CSS class names
        ICON = "k-icon",
        ARROW_60_RIGHT = "k-i-arrow-60-right",
        ARROW_60_DOWN = "k-i-arrow-60-down",

        clickableElements = "." + ACCORDION_HEADER + " > ." + ICON + ", ." + ACCORDION_HEADER,
        defaultAnimationObject = { effects: "expand:vertical", duration: 200 },
        
        // Events
        DATABINDING = "dataBinding",
        DATABOUND = "dataBound",
        CLICK = "click",
        CHANGE = "change";

    var Accordion = Widget.extend({
      init: function(element, options) {
        var that = this,
            defaultTemplate = that.templates.header + that.templates.content;

        kendo.ui.Widget.fn.init.call(that, element, options);

        that.template = kendo.template(that.options.template || defaultTemplate);

        that._dataSource();

        // Add click event on accordion headers and icon
        that.element
              .on(CLICK + NS, clickableElements, $.proxy(that._clickHeader, that));
      },

      options: {
        name: "Accordion",
        autoBind: true,
        template: "",

        // Animation object for expand/collapse accordion items when clicked
        animation: {
          expand: {
            effects: "expand:vertical",
            duration: 200
          },
          collapse: {
            duration: 200
          }
        }
      },

      events: [
        DATABINDING,
        DATABOUND,
        CHANGE,
        CLICK
      ],

      // Template object for header and content templates when rendered
      templates: {
        header: `
            <h3 id="k-header#= data.id #" 
                class="` + ACCORDION_HEADER + ' ' + ACCORDION_HEADER_COLLAPSED + `">
                <i 
                  class="` + ICON + ' ' + ARROW_60_RIGHT +` k-i-arrow-60-right">
                </i>
                #= data.text #
            </h3>`,
        content: `
            <div id="k-content#= data.id #" class="` + ACCORDION_CONTENT + `"> 
              #= (data.content && content.text) ? content.text : "No content" #
            </div>`
      },

      refresh: function() {
        var that = this,
            view = that.dataSource.view(),
            html = kendo.render(that.template, view);
    
        // Trigger the dataBinding event.
        that.trigger(DATABINDING);
    
        // Mutate the DOM (AKA build the widget UI).
        that.element.html(html);
    
        // Trigger the dataBound event.
        that.trigger(DATABOUND);
      },

      _dataSource: function() {

        var that = this;
    
        // If the DataSource is defined and the _refreshHandler is wired up, unbind because
        // you need to rebuild the DataSource.
        if ( that.dataSource && that._refreshHandler ) {
            that.dataSource.unbind(CHANGE, that._refreshHandler);
        }
        else {
            that._refreshHandler = $.proxy(that.refresh, that);
        }
    
        // Returns the datasource OR creates one if using array or configuration object.
        that.dataSource = kendo.data.DataSource.create(that.options.dataSource);
        // Bind to the change event to refresh the widget.
        that.dataSource.bind(CHANGE, that._refreshHandler);
    
        if (that.options.autoBind) {
            that.dataSource.fetch();
        }
      },
      
      _clickHeader: function(event) {
        var that = this,
            target = that._getCurrentTarget(event.target),
            animationOptions = that.options.animation;
    
        if (target && 
            !target.classList.contains(ACCORDION_HEADER_EXPANDED)) {

            // Close expanded item except the target one
            var expandedItem = $("#" + this.element[0].id + "> ." + ACCORDION_HEADER_EXPANDED).not(target);

            if (expandedItem && expandedItem.length) {
                that._toggleHeader(expandedItem[0]);
                that._toggleSection(expandedItem[0].nextElementSibling, animationOptions, COLLAPSE);
            }
            
            // Open clicked accordion item if not opened already
            that._toggleHeader(target);
            that._toggleSection(target.nextElementSibling, animationOptions, EXPAND);
        }
      },

      // _getCurrentTarget function helps for getting the correct target
      _getCurrentTarget: function(clickedTarget) {
        return clickedTarget.classList.contains(ACCORDION_HEADER) ? 
               clickedTarget : clickedTarget.parentNode;
      },

      _toggleCSSclasses: function(element, ...classes) {
        return classes.map(cl => element.classList.toggle(cl));
      },

      // Add open/close css styles for header accordion item
      _toggleHeader: function(target) {
        var that = this;

        that._toggleCSSclasses(target, ACCORDION_HEADER_COLLAPSED, ACCORDION_HEADER_EXPANDED);
        that._toggleCSSclasses(target.children[0], ARROW_60_RIGHT, ARROW_60_DOWN);
      },

      // If there is animation option finds the effects and execute them
      // If there is no animation option - just hides/shows the content
      _toggleSection: function(target, animationOptions, mode) {
        var that = this,
            animationConfig = animationOptions[mode] ? animationOptions[mode] : defaultAnimationObject,
            overlayFx = that._getOverlayFx(target, animationConfig),
            controlFn = that._getControlFn(mode, animationOptions);

        overlayFx.duration(animationConfig.duration || 0);
        overlayFx.stop()[controlFn]();
      },

      // Finds the animation effects string and separates the name of 
      // the effect and the direction to execute kendo.fx fn
      _getOverlayFx: function(target, animationConfig) {
        var animationEffect = animationConfig.effects ? animationConfig.effects : defaultAnimationObject.effects,
            effectName = animationEffect.substr(0, animationEffect.indexOf(":")),
            effectDirection = animationEffect.substr(animationEffect.indexOf(":") + 1),
            overlayFx = kendo.fx(target)[effectName](effectDirection);
        
        return overlayFx;
      },

    // Returns reverse when there is no animation object or effect and the mode is collapse
      _getControlFn: function(mode, animationOptions) {
        return (mode === COLLAPSE && (!animationOptions[mode] || !animationOptions[mode].effects))
                        ? REVERSE : PLAY;
      }
    });

    ui.plugin(Accordion);

  })(jQuery);

  