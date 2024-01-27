SRCDIR = src
DISTDIR = dist
STATICDIR = static
CSSDIR = $(DISTDIR)/css
SCSSDIR = $(SRCDIR)/scss
SCSSINCDIR = $(SCSSDIR)/includes

SCSSFILES = $(wildcard $(SCSSDIR)/*.scss)
CSSFILES = $(patsubst $(SCSSDIR)/%.scss, $(CSSDIR)/%.css, $(SCSSFILES))

MDFILES = $(shell find $(SRCDIR) -type f -name '*.md')
HTMLFILES = $(patsubst $(SRCDIR)/%.md, $(DISTDIR)/%.html, $(MDFILES))
TMPL = $(SRCDIR)/tmpl.html
STATICFILES = $(shell find $(STATICDIR) -type f -name '*')

URI = "https://bear.oops.wtf"

.PHONY: all
all: html css $(DISTDIR)/robots.txt $(DISTDIR)/sitemap.xml $(DISTDIR)/blogindex.txt static

# Build

.PHONY: html
html: $(HTMLFILES)

#$(DISTDIR)/%.html: $(SRCDIR)/%.md
#	pandoc --from markdown --to html --standalone $< -o $@

$(DISTDIR)/%.html: $(SRCDIR)/%.md $(TMPL)
	pandoc \
	--from markdown_github+smart+yaml_metadata_block+auto_identifiers \
	--to html \
	--template $(TMPL) \
	-o $@ $<

.PHONY: css
css: $(CSSFILES)

$(CSSDIR)/%.css: $(SCSSDIR)/%.scss | $(CSSDIR)
	sass --load-path=$(SCSSINCDIR) --style=compressed --scss $< $@

$(CSSDIR):
	mkdir -p $@

$(DISTDIR)/robots.txt:
	@echo "User-Agent: *" > $@
	@echo "Allow: *" >> $@
	@echo "Sitemap: $(URI)/sitemap.xml" >> $@

$(DISTDIR)/sitemap.xml: $(HTMLFILES)
	@echo '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' > $@
	@for f in $^; do \
		echo "<url><loc>$(URI)$${f#$(DISTDIR)}</loc></url>" >> $@; \
	done
	@echo '</urlset>' >> $@

$(DISTDIR)/blogindex.txt: $(HTMLFILES)
	@> $@
	@for f in $^; do \
		uri="$(URI)$${f#$(DISTDIR)}"; \
		if [[ "$$uri" == "$(URI)/blog/"* ]]; then \
			echo "$$uri" >> $@; \
		fi; \
	done
.PHONY: clean
clean:
	rm -v $(HTMLFILES)
	rm -rfv $(CSSDIR)

.PHONY: help
help:
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[34m%-15s\033[0m %s\n", $$1, $$2}'

.PHONY: static
static: $(STATICFILES)
	@cp -r $(STATICFILES) $(DISTDIR)