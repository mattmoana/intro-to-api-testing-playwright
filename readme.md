|                  PUT                  |                       DELETE                        |                     GET                      |
| :-----------------------------------: | :-------------------------------------------------: | :------------------------------------------: |
| positive case with should receive 200 | positive case when order is deleted with status 200 |       get 200 with correct GET request       |
|       incorrect ID returns 400        |           returns 400 if ID is > then 10            |  get 500 with empty username in GET request  |
|    incorrect courier ID return 400    |            returns 405 if ID is missing             | get 500 with missing password in GET request |

| LOAN |                        POST                        |     |
| :--: | :------------------------------------------------: | :-: |
|  1   |  positive case should return 200 with medium risk  |     |
|  2   |   positive case should return 200 with high risk   |     |
|  3   | positive case returns 200 but decision is negative |     |
|  4   |  negative case returns 400 where debt is negative  |     |
