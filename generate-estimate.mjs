import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, HeadingLevel } from "docx";
import fs from "fs";

const border = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function text(str, options = {}) {
  return new TextRun({ text: str, font: "Yu Gothic", size: 20, ...options });
}

function p(str, options = {}) {
  const { bold, size, alignment, spacing, indent } = options;
  return new Paragraph({
    children: [text(str, { bold, size: size || 20 })],
    alignment: alignment || AlignmentType.LEFT,
    spacing: { after: spacing !== undefined ? spacing : 120 },
    indent: indent ? { left: indent } : undefined,
  });
}

function emptyLine(count = 1) {
  return Array.from({ length: count }, () => new Paragraph({ spacing: { after: 80 } }));
}

function row(cells, options = {}) {
  const { headerBg } = options;
  return new TableRow({
    children: cells.map((cell, i) => {
      const isArray = Array.isArray(cell);
      const content = isArray ? cell[0] : cell;
      const width = isArray ? cell[1] : undefined;
      const cellAlign = isArray && cell[2] ? cell[2] : AlignmentType.LEFT;
      return new TableCell({
        children: [new Paragraph({
          children: [text(content, { bold: options.bold, size: 19 })],
          alignment: cellAlign,
          spacing: { before: 40, after: 40 },
        })],
        width: width ? { size: width, type: WidthType.DXA } : undefined,
        borders,
        shading: headerBg ? { fill: headerBg } : undefined,
        margins: { top: 40, bottom: 40, left: 80, right: 80 },
      });
    }),
  });
}

const doc = new Document({
  sections: [{
    properties: {
      page: {
        margin: { top: 1200, bottom: 1000, left: 1200, right: 1200 },
      },
    },
    children: [
      // Title
      p("御 見 積 書", { size: 32, bold: true, alignment: AlignmentType.CENTER, spacing: 200 }),

      ...emptyLine(1),

      // Date and author - right aligned
      new Paragraph({
        children: [text("発行日：2026年6月27日")],
        alignment: AlignmentType.RIGHT,
        spacing: { after: 60 },
      }),
      new Paragraph({
        children: [text("作成者：佐々木 雄一")],
        alignment: AlignmentType.RIGHT,
        spacing: { after: 200 },
      }),

      // Client name
      p("株式会社COMPASS 御中", { size: 22, bold: true, spacing: 200 }),

      // Opening
      p("下記のとおり、レンタカー業務向け多言語対応予約・管理システムの開発について御見積り申し上げます。", { spacing: 200 }),

      // Subject
      p("件名", { bold: true, size: 22, spacing: 80 }),
      p("レンタカー業務向け多言語対応予約・管理システム（MVP）開発", { spacing: 200 }),

      // Total amount
      p("御見積金額", { bold: true, size: 22, spacing: 80 }),
      p("1,200,000円（税込）", { size: 26, bold: true, spacing: 200 }),

      // Period and policy
      p("開発期間：要件確定後、約1〜1.5か月", { spacing: 80 }),
      p("開発方針：実運用可能なMVPとして構築し、将来の機能追加にも対応できる構成", { spacing: 300 }),

      // ========== 1. Overview ==========
      p("1. 開発概要", { bold: true, size: 22, spacing: 120 }),
      p("SNS、Googleカレンダー、Googleフォーム、メール、紙書類に分散している業務を、ホームページと管理システムにまとめます。", { spacing: 80 }),
      p("初期版では、「問い合わせ・空車確認・見積り・予約・書類作成」の流れを中心に、担当者が迷わず操作できるシンプルなシステムを構築します。", { spacing: 300 }),

      // ========== 2. Scope ==========
      p("2. 開発内容", { bold: true, size: 22, spacing: 120 }),
      p("・多言語対応ホームページ（車種・料金・利用案内・問い合わせ導線）", { spacing: 60, indent: 200 }),
      p("・問い合わせ、見積り依頼、予約申込みフォーム", { spacing: 60, indent: 200 }),
      p("・車両ごとの空き状況・予約スケジュール管理", { spacing: 60, indent: 200 }),
      p("・Googleカレンダー連携（時間単位対応）", { spacing: 60, indent: 200 }),
      p("・顧客、車両、見積り、予約を管理する社内管理画面", { spacing: 60, indent: 200 }),
      p("・オプション品（BBQ、テント等）の選択・料金管理機能", { spacing: 60, indent: 200 }),
      p("・見積書、注文書、契約関連書類の自動作成・PDF出力・メール送信", { spacing: 60, indent: 200 }),
      p("・スマートフォン対応、動作テスト、本番公開、簡易操作マニュアル", { spacing: 300, indent: 200 }),

      // ========== 3. Breakdown ==========
      p("3. 御見積内訳", { bold: true, size: 22, spacing: 200 }),

      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          row([["項目", 3600], ["内容", 4400], ["金額（税込）", 1800, AlignmentType.RIGHT]], { bold: true, headerBg: "F0F0F0" }),
          row([["要件整理・基本設計", 3600], ["業務フロー、画面設計、予約ルール、書類、対象言語の整理", 4400], ["150,000円", 1800, AlignmentType.RIGHT]]),
          row([["多言語HP・受付フォーム", 3600], ["ホームページ、車種・料金表示、問い合わせ・見積り・予約受付", 4400], ["250,000円", 1800, AlignmentType.RIGHT]]),
          row([["空車確認・予約管理", 3600], ["空き状況管理（時間単位）、Googleカレンダー連携、二重予約防止", 4400], ["200,000円", 1800, AlignmentType.RIGHT]]),
          row([["管理画面・顧客管理", 3600], ["顧客・車両・予約・問い合わせ・見積り管理、ダッシュボード", 4400], ["250,000円", 1800, AlignmentType.RIGHT]]),
          row([["書類自動作成・通知", 3600], ["5種類のPDF自動生成、メール送信、通知機能", 4400], ["200,000円", 1800, AlignmentType.RIGHT]]),
          row([["オプション品管理", 3600], ["BBQ・テント等のオプション選択・料金計算・管理画面", 4400], ["50,000円", 1800, AlignmentType.RIGHT]]),
          row([["テスト・公開・資料", 3600], ["総合テスト、修正、本番公開（Xserver VPS）、操作マニュアル", 4400], ["100,000円", 1800, AlignmentType.RIGHT]]),
          row([["合計", 3600], ["", 4400], ["1,200,000円", 1800, AlignmentType.RIGHT]], { bold: true, headerBg: "F0F0F0" }),
        ],
      }),

      ...emptyLine(2),

      // ========== 4. Tech stack ==========
      p("4. 技術構成", { bold: true, size: 22, spacing: 120 }),
      p("・画面：PC・スマートフォン対応の多言語Web画面（Next.js / TypeScript）", { spacing: 60, indent: 200 }),
      p("・データ管理：PostgreSQLで顧客・車両・見積り・予約・書類情報を一元管理", { spacing: 60, indent: 200 }),
      p("・外部連携：Google Calendar APIによる車両スケジュール確認・登録", { spacing: 60, indent: 200 }),
      p("・書類・通知：PDF自動作成とメール送信", { spacing: 60, indent: 200 }),
      p("・サーバー：Xserver VPS 16GBプラン（国内データセンター）", { spacing: 300, indent: 200 }),

      // ========== 5. Schedule ==========
      p("5. 開発スケジュール", { bold: true, size: 22, spacing: 120 }),
      p("第1週　　要件・画面・予約ルール・書類・対象言語の確定", { spacing: 60, indent: 200 }),
      p("第2〜3週　多言語HP、問い合わせ・見積り・予約フォーム、空車確認の開発", { spacing: 60, indent: 200 }),
      p("第3〜5週　予約管理、カレンダー連携、管理画面、書類作成、オプション品機能の開発", { spacing: 60, indent: 200 }),
      p("第6週　　総合テスト、修正、操作説明、本番公開", { spacing: 300, indent: 200 }),

      // ========== 6. Running cost ==========
      p("6. サーバー・ドメイン費用（別途）", { bold: true, size: 22, spacing: 200 }),

      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          row([["項目", 4000], ["費用", 3000], ["備考", 2800]], { bold: true, headerBg: "F0F0F0" }),
          row([["ドメイン取得", 4000], ["約¥1,500〜3,000/年", 3000], [".jpドメインの場合", 2800]]),
          row([["SSL証明書", 4000], ["¥0", 3000], ["Let's Encrypt（無料）", 2800]]),
          row([["Xserver VPS 16GB", 4000], ["¥7,200/月", 3000], ["8コア / 16GB RAM / SSD 100GB", 2800]]),
          row([["Google Calendar API", 4000], ["¥0", 3000], ["無料枠で対応", 2800]]),
          row([["メール送信", 4000], ["¥0", 3000], ["サーバー内から送信", 2800]]),
          row([["月額合計", 4000], ["約¥7,500/月", 3000], ["年間約¥90,000", 2800]], { bold: true, headerBg: "F0F0F0" }),
        ],
      }),

      ...emptyLine(2),

      // ========== 7. Deliverables ==========
      p("7. 納品物", { bold: true, size: 22, spacing: 120 }),
      p("・本番公開済みの多言語ホームページ・予約管理システム", { spacing: 60, indent: 200 }),
      p("・開発したソースコード一式", { spacing: 60, indent: 200 }),
      p("・基本設定資料・管理者向け簡易操作マニュアル・初回操作説明", { spacing: 300, indent: 200 }),

      // ========== 8. Prerequisites ==========
      p("8. ご準備いただくもの", { bold: true, size: 22, spacing: 120 }),
      p("・会社情報、ロゴ、車両写真、車種情報、料金表、利用条件", { spacing: 60, indent: 200 }),
      p("・見積書・注文書・契約関連書類の確定テンプレート", { spacing: 60, indent: 200 }),
      p("・対象言語の翻訳文、または翻訳内容を確認できるご担当者", { spacing: 60, indent: 200 }),
      p("・Googleカレンダー等、連携に必要なアカウント情報・権限", { spacing: 60, indent: 200 }),
      p("・オプション品の品目リスト・料金", { spacing: 300, indent: 200 }),

      // ========== 9. Terms ==========
      p("9. 前提条件・保証", { bold: true, size: 22, spacing: 120 }),
      p("・開発開始前に、画面・機能・入力項目・書類・対象言語・運用方法を確認し、最終仕様を確定します。", { spacing: 60, indent: 200 }),
      p("・サーバー、ドメイン、メール、有料API、翻訳等の外部サービス利用料は別途実費となります。", { spacing: 60, indent: 200 }),
      p("・書類の文面および法的内容は、株式会社COMPASS様にてご確認・ご承認いただきます。", { spacing: 60, indent: 200 }),
      p("・必要資料や確認回答の遅延がある場合、開発日程を調整することがあります。", { spacing: 60, indent: 200 }),
      p("・合意した仕様との相違または開発上の不具合は、納品後30日間、無償で修正します。", { spacing: 300, indent: 200 }),

      ...emptyLine(2),

      // Closing
      p("以上", { alignment: AlignmentType.RIGHT, spacing: 200 }),
    ],
  }],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync("/home/onlinelogistics/Documents/car-rental-system/見積書_COMPASS_レンタカーシステム.docx", buffer);
console.log("見積書を生成しました: 見積書_COMPASS_レンタカーシステム.docx");
