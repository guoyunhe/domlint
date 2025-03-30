import unique from '@guoyunhe/unique-selector';
import { DOMLintConfig } from './DOMLintConfig';
import { DOMLintAttributeReport, DOMLintElementReport, DOMLintReport } from './DOMLintReport';
import { printReport } from './printReport';
import { validateStyle } from './validateStyle';

export class DOMLint {
  report: DOMLintReport;

  constructor(public config: DOMLintConfig) {}

  lint(root?: Element): DOMLintReport {
    const report: DOMLintReport = { score: 0, goodness: 0, badness: 0, elements: {} };

    Object.entries(this.config.rules).forEach(([selector, elemRule]) => {
      if (elemRule.exist && !document.querySelector(selector)) {
        report.elements[selector] = {
          selector,
          attributes: {
            exist: {
              pass: false,
              goodness: elemRule.exist.goodness,
              badness: elemRule.exist.badness,
              value: 'missing',
            },
          },
        };
      }
    });

    (root || document).querySelectorAll('*').forEach((elem) => {
      const ignored = this.config.ignore?.some((selector) => elem.matches(selector));
      if (ignored) return;

      Object.entries(this.config.rules).forEach(([selector, elemRule]) => {
        const matched = elem.matches(selector);
        if (!matched) return;

        const uniqueSelector = unique(elem);

        const elemReport: DOMLintElementReport = report.elements[uniqueSelector] || {
          selector: uniqueSelector,
          html: elem.outerHTML.substring(0, 255),
          attributes: {},
        };

        elem instanceof HTMLElement &&
          Object.entries(elemRule.style).forEach(([name, rule]) => {
            const reportKey = `style.${name}`;
            const attrReport: DOMLintAttributeReport = elemReport.attributes[reportKey] ?? {
              pass: true,
              goodness: rule.goodness ?? 1,
              badness: rule.badness ?? 1,
              value: elem.computedStyleMap().get(name).toString(),
              expected: rule.expected,
            };

            if (!attrReport.pass) return;

            attrReport.pass = validateStyle(elem, name, rule.expected);

            elemReport.attributes[reportKey] = attrReport;
          });

        report.elements[uniqueSelector] = elemReport;
      });
    });

    Object.values(report.elements).forEach((elemReport) => {
      Object.values(elemReport.attributes).forEach((attrReport) => {
        if (attrReport.pass) {
          report.goodness += attrReport.goodness;
        } else {
          report.badness += attrReport.badness;
        }
      });
    });

    report.score = Math.floor((report.goodness / (report.goodness + report.badness)) * 100);

    this.report = report;

    return report;
  }

  print(report?: DOMLintReport) {
    printReport(report || this.report);
  }
}
