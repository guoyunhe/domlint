/* eslint-disable no-console */
import chalk from 'chalk';
import { DOMLintReport } from './DOMLintReport';

export function printReport(report?: DOMLintReport) {
  Object.entries(report.elements).forEach(([selector, elemReport]) => {
    console.log(chalk.blue(selector), chalk.dim(elemReport.html));
    Object.entries(elemReport.attributes)?.forEach(([name, attrReport]) => {
      console.log(
        `${name}:`,
        attrReport.pass
          ? attrReport.value
          : `${chalk.red(attrReport.value)} ${chalk.dim(`expected: ${Array.isArray(attrReport.expected) ? attrReport.expected?.join(' | ') : attrReport.expected}}`)}`,
      );
    });
  });
  console.log(
    `Score: ${report.score} Goodness: ${chalk.green(report.goodness)} Badness: ${chalk.bold.red(report.badness)}`,
  );
}
