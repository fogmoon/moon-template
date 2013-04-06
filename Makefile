all: buildall

buildall: clean
	@echo ""
	@echo "=============== DEFAULT TEMPLATE ================="
	@echo "Compiling stylus files of the default Moon template..."
	cd styles/stylus; stylus -c < style.styl > ../style.css;
	@echo "=================================================="
	@echo ""

clean:
	@echo "Cleaning the default Moon template..."
	@rm styles/*.css;

.PHONY: buildall


