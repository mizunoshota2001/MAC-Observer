import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// ログのフォーマットを設定
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(
    (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
  )
);

// ファイルにローテートしながらログを保存するトランスポート
const transport = new DailyRotateFile({
  filename: "logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d", // 過去14日分のログを保持
});

// コンソールにもログを出力する場合
const consoleTransport = new transports.Console({
  format: format.combine(format.colorize(), logFormat),
});

// ロガーの作成
const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug", // ログレベルを設定
  format: logFormat,
  transports: [transport, consoleTransport],
});

export default logger;
