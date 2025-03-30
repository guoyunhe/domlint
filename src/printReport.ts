/* eslint-disable no-console */
import chalk from 'chalk';
import { DOMLintReport } from './DOMLintReport';

export function printReport(report?: DOMLintReport) {
  if (!report) {
    console.error('DOMLint report does not exist');
    return;
  }

  const output: string[] = [];

  Object.entries(report.elements).forEach(([selector, elemReport]) => {
    output.push(chalk.blue(selector));
    if (elemReport.html) {
      output.push(chalk.gray(elemReport.html));
    }

    Object.entries(elemReport.attributes)?.forEach(([name, attrReport]) => {
      let line = `\t${chalk.yellow(name)}: `;
      if (attrReport.pass) {
        line += attrReport.value;
      } else {
        line += chalk.red(attrReport.value);
        line += ` [expected: ${Array.isArray(attrReport.expected) ? attrReport.expected?.join(' | ') : attrReport.expected}]`;
      }
      output.push(line);
    });
    output.push('');
  });

  let score = chalk.bold.red(`${report.score} (bad)`);
  if (report.level === 'good') {
    score = chalk.bold.green(`${report.score} (good)`);
  } else if (report.level === 'okay') {
    score = chalk.bold.yellow(`${report.score} (okay)`);
  }

  output.push(
    `Score: ${score} Goodness: ${chalk.green(report.goodness)} Badness: ${chalk.red(report.badness)}`,
  );

  console.log(output.join('\n'));
}
