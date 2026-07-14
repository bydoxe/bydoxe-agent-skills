# Language Support

Use this reference when a BYDOXE request is written in Korean, Japanese, Chinese, Vietnamese, or Russian. Keep explanations in the user's language when helpful, but keep CLI commands, API paths, parameters, option names, and repository documentation in English.

English is the canonical language for BYDOXE CLI commands and API concepts. Do not create a separate English language mapping unless a future workflow needs dialect or synonym handling.

## Core Rule

Translate user intent into BYDOXE concepts before selecting a command.

1. Identify whether the request is a public read, authenticated read, or write action.
2. Map trading words to canonical concepts such as `buy`, `sell`, `market`, `limit`, `ticker`, `orderbook`, `candles`, `long`, `short`, `close position`, and `withdraw`.
3. Treat ambiguous liquidation, closing, selling all, and position-management phrases as high risk until clarified.
4. Require exact `CONFIRM` for write actions in every supported language.

## Intent Mapping

| Concept | Korean | Japanese | Chinese | Vietnamese | Russian |
| --- | --- | --- | --- | --- | --- |
| Buy | 매수, 사줘 | 買い, 買って | 买入, 买, 买进 | mua | купить, покупка |
| Sell | 매도, 팔아줘 | 売り, 売って | 卖出, 卖 | bán | продать, продажа |
| Market order | 시장가 | 成行 | 市价 | lệnh thị trường | рыночный ордер |
| Limit order | 지정가 | 指値 | 限价 | lệnh giới hạn | лимитный ордер |
| Current price | 현재가 | 現在値 | 当前价, 最新价 | giá hiện tại | текущая цена |
| Ticker | 티커, 현재가 | ティッカー | 行情, ticker | ticker | тикер |
| Order book | 호가, 오더북 | 板, オーダーブック | 盘口, 订单簿 | sổ lệnh | стакан заявок |
| Candles | 캔들, 봉 | ローソク足 | K线, 蜡烛图 | nến | свечи |
| Long | 롱 | ロング | 做多, 多头 | long, mua lên | лонг |
| Short | 숏 | ショート | 做空, 空头 | short, bán xuống | шорт |
| Take profit | 익절 | 利確 | 止盈 | chốt lời | тейк-профит |
| Stop loss | 손절 | 損切り | 止损 | cắt lỗ | стоп-лосс |
| Close position | 포지션 종료, 정리 | ポジション決済 | 平仓 | đóng vị thế | закрыть позицию |
| Liquidation | 청산 | ロスカット, 強制決済 | 爆仓, 强平 | thanh lý | ликвидация |
| Transfer | 이체 | 振替 | 划转, 转账 | chuyển khoản | перевод |
| Withdraw | 출금 | 出金 | 提现 | rút tiền | вывод |

## Ambiguity Rules

Ask a clarification question before acting when a phrase could mean either analysis or account-changing execution.

| Phrase Type | Risk | Required Handling |
| --- | --- | --- |
| "clean up", "close", or "settle" a position | Could mean summarize, sell, close futures exposure, or liquidation | Ask whether the user wants a read-only summary or an order/position action |
| "sell all" or equivalent | Could place a high-risk market or limit order | Treat as a write action and require exact `CONFIRM` after a command preview |
| "liquidate" or equivalent | Could mean forced liquidation data or manually closing a position | Ask whether the user means liquidation information or closing a position |
| "average down" or equivalent | Could place additional buy orders | Treat as order intent and require order details plus `CONFIRM` |
| TP/SL phrases | Could create, modify, or inspect take-profit and stop-loss orders | Ask whether the user wants a read-only explanation or a live TP/SL change |

For "sell all", "close all", or equivalent phrases, do not ask for `CONFIRM` immediately. First establish the exact asset, account type, available amount or position size, order type, and target command. Use a read-only balance or position lookup when the amount is unknown, then show a dry-run write preview before requesting `CONFIRM`.

## Confirmation Rule

The following approval words are not enough for write actions:

| Language | Examples That Are Not Enough |
| --- | --- |
| Korean | 응, 그래, 진행해, 확인, 오케이 |
| Japanese | はい, 進めて, 確認, OK |
| Chinese | 好, 可以, 确认, 继续, OK |
| Vietnamese | vâng, được, tiếp tục, xác nhận, OK |
| Russian | да, хорошо, продолжай, подтверждаю, OK |

For write actions, proceed only after the user replies with the exact token:

```text
CONFIRM
```

## Response Language

When the user asks in a supported non-English language, answer in that language unless the user asks otherwise. Keep commands and parameters unchanged:

```sh
bydoxe spot market tickers --symbol BTCUSDT --dry-run --format json
```

Do not translate command names, flags, API paths, symbols, environment variable names, or `CONFIRM`.
