# Linxu简单命令学习

## 命令
```
shutdown -h now//正常关机
halt //关闭内存
init 0 //
logout //退出登录
 

ls //查看当前的文件
    白色的为普通文件 --  蓝色为文件夹
pwd 为当前的文件路径

touch 新建文件
vim /etc/motd  //修改登录界面
cd /etc/os-release  //查看系统呃版本号
su lwz 用户切换


```
### Linux命令行


|命令|空格|参数（可写可不写）|空格|文件，文件夹|
|:--:|:--:|:--:|:--:|:--:|
|ls列出文件夹的内容||||/data 根目录下的data文件夹|
|ls||-a all 列出所有的文件以及隐藏文件||/data|
|ls||-a ||如果不写输入当前的文件|
|ls||||输入当前的文件|
|ls||-a||-l 查询更详细的文件|
> 基本的命令如上
* 一般情况下，linux命令的参数都是可选的，可写可不写，不同的参数作用也不一样。
* Linux 命令行之间，必须得有多个空格。

### Linux 提示符
* whoami 我是谁，显示当前的用户
* hostname 显示当前的主机名
* pwd 显示当前的路径
* 
```
命令提示符
[py@pylinux ~]$            普通用户py，登陆后

[root@pylinux ~]#        超级用户root，登录后

root代表当前登录的用户

@ 分隔符

pylinux 主机名

~  当前的登录的位置，此时是家目录

# 超级用户身份提示符
$ 普通用户身份提示符

```
### Linux 文件及目录管理命令
|命令|作用|
|:--:|:--:|
| cat |查看文件|
|vim| 打开文件|
|i|  插入编辑|
|:wq!| 强制保存并退出|
|:q!|  强制退出不保存|
|:wq| 保存并退出|
|cd 目录名 | 切换文件夹|
|touch文件名 |如果文件不存在就创建文件|
|mkdir目录名 |创建目录|
|rm |文件名 |删除指定的文件|
#### cd 命令 变换目录
* . 当前目录
* .. 上一层目录
* - 前一个工作目录
* ~ 当前用户所在的家的目录
* / 顶级根目录
* 
#### ls 命令
* -a 显示指定目录下所有子目录与文件，包括以.开头的隐藏文件
* -l 以列表方式显示文件的详细信息   ls -l 等于ll 用法
* -h, --human-readable          与-l 一起，以易于阅读的格式输出文件大小
                                (例如 1K 234M 2G)
* -t 根据最后修改时间排序，默认是以文件名排序，通常与-l 连用
* -F 在条目后加上文件类型的指示符号(* ， /， = ， @ ， | ，其中的一个)
    -    注:可以标识文件类型
    -    加上 * 代表可执行的普通文件
    -    加上 = 表示套接字
    -    加上 | 表示FIFOS(队列系统)
    -  加上 @表示符号链接
    -  加上 / 表示文件夹

* -d 显示目录本身的信息 而不是显示目录的内容
* -r, --reverse                 逆序排列
* -S                            根据文件大小排序,从大到小排序
* -i 显示索引节点信息(索引节点相当于身份证号)
* --full-time 以完整的时间格式输出(也就是按照中国的时间日期显示)
#### mkdir命令
> 创建文件夹

* 用法：mkdir [选项]... 目录...
* 若指定目录不存在则创建目录。

* -m, --mode=模式       设置权限模式(类似chmod)，而不是rwxrwxrwx 减umask
* -p, --parents         需要时创建目标目录的上层目录，但即使这些目录已存在也不当作错误处理
*  mkdir {1..3}加花括号创建连续的目录，用..隔开 花括号内可以是连续的数字、连续的字母mkdir {a..e}
#### touch命令
> 创建文件或修改文件时间戳

```
用法：touch [选项]... 文件...
将每个文件的访问时间和修改时间改为当前时间。

不存在的文件将会被创建为空文件，除非使用-c 或-h 选项。

touch {连续数字或字母} 创建多个文件序列
touch {1..10}创建文件或修改文件时间戳

touch {a..z}

  -c, --no-create       不创建任何文件
  -t STAMP              使用[[CC]YY]MMDDhhmm[.ss] 格式的时间替代当前时间
  -r, --reference=文件  使用指定文件的时间属性替代当前文件时间

```
#### cp复制
```

用法：cp [选项]... [-T] 源文件 目标文件
　或：cp [选项]... 源文件... 目录
　或：cp [选项]... -t 目录 源文件...
将源文件复制至目标文件，或将多个源文件复制至目标目录。

-r 递归式复制目录，即复制目录下的所有层级的子目录及文件 -p 复制的时候 保持属性不变
-d 复制的时候保持软连接(快捷方式)
-a 等于-pdr
-p                等于--preserve=模式,所有权,时间戳，复制文件时保持源文件的权限、时间属性
-i, --interactive        覆盖前询问提示
```
#### mv命令
```

mv命令就是move的缩写，作用是移动或是重命名文件

用法：mv [选项]... [-T] 源文件 目标文件
　或：mv [选项]... 源文件... 目录
　或：mv [选项]... -t 目录 源文件...
将源文件重命名为目标文件，或将源文件移动至指定目录。

-f, --force                  覆盖前不询问
-i, --interactive            覆盖前询问
-n, --no-clobber             不覆盖已存在文件如果您指定了-i、-f、-n 中的多个，仅最后一个生效。
-t, --target-directory=DIRECTORY      将所有参数指定的源文件或目录移动至 指定目录
-u, --update                  只在源文件文件比目标文件新，或目标文件不存在时才进行移动

```
#### rm 命令
```
用法：rm [选项]... 文件...
删除 (unlink) 文件。

rm命令就是remove的含义，删除一个或者多个文件，这是Linux系统重要命令
-f, --force           强制删除。忽略不存在的文件，不提示确认
-i                    在删除前需要确认
-I                    在删除超过三个文件或者递归删除前要求确认。
-d, --dir    删除空目录
-r, -R, --recursive   递归删除目录及其内容
-v, --verbose         详细显示进行的步骤
      --help            显示此帮助信息并退出
      --version         显示版本信息并退出
       

```
#### Linux帮助命令
```
语法
man 命令  

如：
man  ls  

进入man帮助文档后，按下q退出


语法：
命令 --help

帮助命令的精简版
如 ls --help


语法：
help  命令  

只针对bash内置命令


语法：
info 命令
```

### vim命令
#### vim基础用法
* vi oldboy.txt #打开文件
* 打开后无法直接编辑，需要按 i 进入编辑模式
* 修改这个文件内容吧
* 修改完后，按 esc 退出编辑模式:wq
* 保存退出 #注意":"必须是英文符号
:wq 保存并退出
:q! 强制退出不保存
:wq! 强制保存退出
#### 移动光标

```
w(e)　　移动光标到下一个单词
b　　　　移动到光标上一个单词

数字0　　移动到本行开头
$　　　　移动光标到本行结尾

H　　　　移动光标到屏幕首行
M　　　　移动到光标到屏幕的中间一行
L　　　　移动光标到屏幕的尾行
gg　　　 移动光标到文档的首行
G　　　　移动光标到文档尾行

ctrl + f　　下一页
ctrl + b　　上一页

`.　　移动光标到上一次的修改行
```
#### 查找

```
/chaoge     在整篇文档中搜索chaoge字符串,向下查找
?chaoge     在整篇文档中搜索chaoge字符串,向上查找

*        查找整个文档，匹配光标所在的所有单词,按下n查找下一处,N上一处
#        查找整个文档，匹配光标所在的所有单词,按下n查找下一处,N上一处

gd        找到光标所在单词匹配的单词，并停留在非注释的第一个匹配上

%　　　　找到括号的另一半！！
```
#### 复制、删除、粘贴
```
yy    拷贝光标所在行
dd    删除光标所在行
D     删除当前光标到行尾的内容
dG    删除当前行到文档尾部的内容
p     粘贴yy所复制的内容
x　　  向后删除字符
X     先前删除字符
u     撤销上一步的操作
.       重复前一个执行过的动作
```

#### 数字与命令
```
3yy　　　　拷贝光标所在的3行
5dd　　　　删除光标所在5行
```
#### 快捷操作

```
删除光标所在位置到行尾的内容并进入编辑模式 C(大写字母)
在命令模式下按下字母i，即可进入输入模式，可以编写代码啦。。。
在当前行下面插入一行并进入编辑模式 o(小写字母)
在当前行上面插入一行并进入编辑模式 O(大写字母)
快速到达行尾并进入编辑模式 A
快速保存并退出 ZZ
```
#### 批量快捷操作
```
批量删除:
进入批量编辑模式(可视块)
ctrl+v 
选择 上下左右
删除 d 

批量增加:进入批量编辑模式(可视块)ctrl+v
选择区域
输入大写的 I 进入编辑模式 编辑
按下ESC键

批量去掉注释
1. 进入命令行模式，按ctrl + v进入 visual block模式，按字母l横向选中列的个数，例如 // 需要选中2列
2. 按字母j，或者k选中注释符号
3. 按d键就可全部取消注释

```
#### vim批量缩进
```
:set tabstop=4 设定tab宽度为4个字符
:set shiftwidth=4 设定自动缩进为4个字符
:set expandtab 用space替代tab的输入
:set noexpandtab 不用space替代tab的输入

1.命令模式，按下v，进入可视模式
2.光标移动选择行，输入 > 大于号，缩进，输入< 缩进

输入行号缩进：
1.显示行号
:set nu        #显示
:set nonu    #关闭

2.行号缩进
:10,20 >    #10到20行，缩进一次
```
> 底线命令模式
```
在命令模式下输入冒号（英文的:），就进入了底线命令模式，在底线命令模式下可以输入单个或多个字符的命令，常用命令有：

:q!     强制退出
:wq!    强制写入退出
:set nu 显示行号
:数字　　调到数字那行
:set nonu 取消显示行号

随时按下esc可以退出底线命令模式
```
### 重定向符号
### cat命令
> cat命令用于查看纯文本文件（常用于内容较少的）， 可以理解为是猫，瞄一眼文件内容
其单词是concatenate，指的是可以连接多个文件且打印到屏幕，或是重定向到文件中
```
用法：cat [选项] [文件]...
将[文件]或标准输入组合输出到标准输出。

清空文件内容,慎用
1.直接清空不留空行
> 文件名
2.直接清空留下空行
echo > gushi.txt
3.利用cat读取一个黑洞文件，然后清空其他文本。
/dev/null  


-A, --show-all           等价于 -vET
-b, --number-nonblank    对非空输出行编号
-e                       等价于 -vE
-E, --show-ends          在每行结束处显示 $
-n, --number             对输出的所有行编号
-s, --squeeze-blank      不输出多行空行
-t                       与 -vT 等价
-T, --show-tabs          将跳格字符显示为 ^I
-u                       (被忽略)
-v, --show-nonprinting   使用 ^ 和 M- 引用，除了 LFD 和 TAB 之外
--help     显示此帮助信息并退出
--version  输出版本信息并退出

如果[文件]缺省，或者[文件]为 - ，则读取标准输入。

```
### tac命令
> 与cat命令作用相反，反向读取文件内容

### 管道符
```
Linux提供的管道符“|”讲两条命令隔开，管道符左边命令的输出会作为管道符右边命令的输入。
常见用法：
#检查python程序是否启动
ps -ef|grep "python"

#找到/tmp目录下所有txt文件
ls /tmp|grep '.txt'

#检查nginx的端口是否存活
netstat -tunlp |grep nginx

```
### more命令
> More是一个过滤器, 用于分页显示 (一次一屏) 文本，以当前屏幕窗口尺寸为准

```
语法
more 参数  文件

-num 指定屏幕显示大小为num行
+num 从num行开始显示

交互式more的命令：
空格     向下滚动一屏
Enter 向下显示一行
=            显示当前行号
q            退出

```
### less命令
> less命令是more的反义词
```

语法：
less 参数 文件

-N 显示每行编号
-e 到文件结尾自动退出，否则得手动输入q退出

子命令

整个的翻页
b    向前一页
f 向后一页

空格    查看下一行，等于 ↓
y            查看上一行，等于↑

q退出
```
### head命令
> 用于显示文件内容头部，默认显示开头10行
```
用法：head [选项]... [文件]...
将每个指定文件的头10 行显示到标准输出。
如果指定了多于一个文件，在每一段输出前会给出文件名作为文件头。
如果不指定文件，或者文件为"-"，则从标准输入读取数据。

  -c,  --bytes=[-]K     显示每个文件的前K 字节内容；
                        如果附加"-"参数，则除了每个文件的最后K字节数据外
                        显示剩余全部内容
  -n, --lines=[-]K      显示每个文件的前K 行内容；
                        如果附加"-"参数，则除了每个文件的最后K 行外显示
                        剩余全部内容
  -q, --quiet, --silent 不显示包含给定文件名的文件头
  -v, --verbose         总是显示包含给定文件名的文件头
      --help            显示此帮助信息并退出
      --version         显示版本信息并退出

```
### tail命令
> 显示文件内容的末尾，默认输出后10行
```
-c 数字                            指定显示的字节数
-n 行数                            显示指定的行数
-f                                  实时刷新文件变化
-F 等于 -f --retry                 不断打开文件，与-f合用
--pid=进程号                 进程结束后自动退出tail命令
-s 秒数                            检测文件变化的间隔秒数

```
### cut命令
> cut - 在文件的每一行中提取片断
在每个文件FILE的各行中, 把提取的片断显示在标准输出。

```
语法

cut 参数  文件

-b         以字节为单位分割
-n         取消分割多字节字符，与-b一起用
-c         以字符为单位
-d         自定义分隔符，默认以tab为分隔符
-f         与-d一起使用，指定显示哪个区域
N       第 N 个 字节, 字符 或 字段, 从 1 计数 起 
N-       从 第 N 个 字节, 字符 或 字段 直至 行尾 
N-M     从 第 N 到 第 M (并包括 第M) 个 字节, 字符 或 字段 
-M       从 第 1 到 第 M (并包括 第M) 个 字节, 字符 或 字段
```

### sort命令
> sort命令将输入的文件内容按照规则排序，然后输出结果
```
用法：sort [选项]... [文件]...
　或：sort [选项]... --files0-from=F
串联排序所有指定文件并将结果写到标准输出。

 -b, --ignore-leading-blanks   忽略前导的空白区域
 -n, --numeric-sort            根据字符串数值比较
 -r, --reverse                 逆序输出排序结果
 -u, --unique          配合-c，严格校验排序；不配合-c，则只输出一次排序结果
 -t, --field-separator=分隔符  使用指定的分隔符代替非空格到空格的转换
 -k, --key=位置1[,位置2]       在位置1 开始一个key，在位置2 终止(默认为行尾)
```
### uniq命令
> uniq命令可以输出或者忽略文件中的重复行，常与sort排序结合使用
```
用法：uniq [选项]... [文件]
从输入文件或者标准输入中筛选相邻的匹配行并写入到输出文件或标准输出。

不附加任何选项时匹配行将在首次出现处被合并。

-c, --count           在每行前加上表示相应行目出现次数的前缀编号
-d, --repeated        只输出重复的行
-u, --unique          只显示出现过一次的行,注意了，uniq的只出现过一次，是针对-c统计之后的结果
```
### wc命令
> wc命令用于统计文件的行数、单词、字节数
```
-c, --bytes打印字节数
-m, --chars  打印字符数 
-l, --lines  打印行数 
-L, --max-line-length  打印最长行的长度
-w, --words 打印单词数
```
### tr命令
> tr命令从标准输入中替换、缩减或删除字符，将结果写入到标准输出
```
用法：tr [选项]... SET1 [SET2]
从标准输入中替换、缩减和/或删除字符，并将结果写到标准输出。

字符集1：指定要转换或删除的原字符集。

当执行转换操作时，必须使用参数“字符集2”指定转换的目标字符集。

但执行删除操作时，不需要参数“字符集2”；

字符集2：指定要转换成的目标字符集。

-c或——complerment：取代所有不属于第一字符集的字符；
-d或——delete：删除所有属于第一字符集的字符；
-s或--squeeze-repeats：把连续重复的字符以单独一个字符表示；
-t或--truncate-set1：先删除第一字符集较第二字符集多出的字符。
```
### stat命令
> stat命令用于显示文件的状态信息。stat命令的输出信息比ls命令的输出信息要更详细。
* stat(选项)(参数)

#### 选项
```
 -L, --dereference     跟随链接
  -f, --file-system     显示文件系统状态而非文件状态
  -c --format=格式      使用指定输出格式代替默认值，每用一次指定格式换一新行
      --printf=格式     类似 --format，但是会解释反斜杠转义符，不使用换行作
                                输出结尾。如果您仍希望使用换行，可以在格式中
                                加入"\n"
  -t, --terse           使用简洁格式输出
      --help            显示此帮助信息并退出
      --version         显示版本信息并退出

 有效的文件格式序列(不使用 --file-system)：
  %a    八进制权限
```
#### 参数
> 文件：指定要显示信息的普通文件或者文件系统对应的设备文件名。
```
[root@www ~]#stat abc.ph
  文件："abc.ph"
  大小：0               块：0          IO 块：4096   普通空文件
设备：801h/2049d        Inode：1200314     硬链接：1
权限：(0644/-rw-r--r--)  Uid：(    0/    root)   Gid：(    0/    root)
最近访问：2013-05-14 13:24:30.830729223 +0800
最近更改：2013-05-14 13:24:30.830729223 +0800
最近改动：2013-05-14 13:24:30.830729223 +0800
创建时间：-

[root@luffycity tmp]# stat test.txt
  File: 'test.txt'
  Size: 16            Blocks: 8          IO Block: 4096   regular file
Device: fd00h/64768d    Inode: 17540200    Links: 1
Access: (0644/-rw-r--r--)  Uid: (    0/    root)   Gid: (    0/    root)
Context: unconfined_u:object_r:user_tmp_t:s0
Access: 2019-10-18 14:58:59.465647961 +0800
Modify: 2019-10-18 14:58:57.799636638 +0800
Change: 2019-10-18 14:58:57.799636638 +0800
 Birth: -

#显示文件权限
[root@pylinux test_find]# stat -c  %a alex.txt
644

```
#### stat的时间戳
```
Access: 2019-10-18 14:58:59.465647961 +0800
Modify: 2019-10-18 14:58:57.799636638 +0800
Change: 2019-10-18 14:58:57.799636638 +0800

access、最近访问，文件每次被cat之后，时间变化，由于操作系统特性，做了优化，频繁访问，时间不变
modify，最近更改，更改文件内容，vim等
change，最近改动，文件元数据改变，如文件名

```

### find命令
> find命令用来在指定目录下查找文件。任何位于参数之前的字符串都将被视为欲查找的目录名。
如果使用该命令时，不设置任何参数，则find命令将在当前目录下查找子目录与文件。
并且将查找到的子目录和文件全部进行显示。
```
find 查找目录和文件，语法：

find 路径 -命令参数 [输出形式]

参数说明：
路径：告诉find在哪儿去找你要的东西，
```
|参数|	解释|
|:--:|:--:|
|-pathname	|要查找的路径|
|# options选项|	
|-maxdepth	|<目录层级>：设置最大目录层级；|
|-mindepth|	<目录层级>：设置最小目录层级；|
|# tests模块	|
|-atime	|按照文件访问access的时间查找，单位是天|
|-ctime	|按照文件的改变change状态来查找文件，单位是天|
|-mtime	|根据文件修改modify时间查找文件【最常用】|
|-name	|按照文件名字查找，支持* ? [] 通配符|
|-group	|按照文件的所属组查找|
|-perm	|按照文件的权限查找|
|-size n[cwbkMG]|	按照文件的大小 为 n 个由后缀决定的数据块。其中后缀为：<br>b: 代表 512 位元组的区块（如果用户没有指定后缀，则默认为 b） <br>c: 表示字节数 <br>k: 表示 kilo bytes （1024字节）<br>w: 字 （2字节）<br>M:兆字节（1048576字节）<br>G: 千兆字节 （1073741824字节）|
| -type 查找某一类型的文件|	b - 块设备文件。<br>d - 目录。<br>c - 字符设备文件。<br>p - 管道文件。<br>l - 符号链接文件。<br>f - 普通文件。<br>s - |socket文件|
|-user	|按照文件属主来查找文件。|
|-path|	配合-prune参数排除指定目录|
|Actions模块	|
|-prune	|使find命令不在指定的目录寻找|
|-delete|	删除找出的文件|
|-exec 或-ok|	对匹配的文件执行相应shell命令|
|-print	|将匹配的结果标准输出|
|OPERATORS	|
!	取反|
|-a -o |	取交集、并集，作用类似&&和\|

>UNIX/Linux文件系统每个文件都有三种时间戳：

- 访问时间（-atime/天，-amin/分钟）：用户最近一次访问时间（文件修改了，还未被读取过，则不变）。
- 修改时间（-mtime/天，-mmin/分钟）：文件最后一次修改时间（数据变动）。
- 变化时间（-ctime/天，-cmin/分钟）：文件数据元（例如权限等）最后一次修改时间。
- 文件任何数据改变，change变化，无论是元数据变动，或是对文件mv，cp等
- 文件内容被修改时，modify和change更新
- 当change更新后，第一次访问该文件（cat，less等），access time首次会更新，之后则不会

#### find根据修改时间查找文件
```
#一天以内，被访问access过的文件
find . -atime -1  

#一天以内，内容变化的文件
find . -mtime -1 

#恰好在7天内被访问过的文件
[root@pylinux home]# find /  -maxdepth 3  -type f -atime 7
```
时间说明
- -atime -2 搜索在2天内被访问过的文件
- -atime 2 搜索恰好在2天前被访问过的文件
- -atime +2 超过2天内被访问的文件

#### find反向查找

```
[root@pylinux opt]# find . -maxdepth 1  -type d      #在opt目录下 查找最大目录深度为1 文件夹类型的数据

[root@pylinux opt]# find . -maxdepth 1  ! -type d    # 加上感叹号，后面接条件，代表取除了文件夹以外类型

```
#### 根据权限查找

```
[root@pylinux opt]# find . -maxdepth 2  -perm 755 -type f  #寻找权限类型是755的文件

```
#### 按照文件大小查
```
[root@pylinux opt]# du -h `find . -maxdepth 2 -size +10M`        #找出超过10M大小的文件
14M    ./Python-3.7.3/python
24M    ./Python-3.7.3/libpython3.7m.a
322M    ./s21-centos-vim.tar.gz
```
#### 查找文件时忽略目录
```
[root@pylinux s18tngx]# find . -path "./conf.d" -prune -o -name "*.conf" -print

```
#### 根据用户组匹配

```
[root@pylinux home]# find / -maxdepth 3 -group yu        #全局搜索深度为3，用户组是yu的文件
/home/yu
/home/yu/.bashrc
/home/yu/.bash_profile
/home/yu/.bash_history
/home/yu/.cache
/home/yu/.bash_logout
/home/yu/.config

```
#### 使用-exec或是-ok再次处理
> -ok比-exec更安全，存在用户提示确认
```
#找出以.txt结尾的文件后执行删除动作且确认
[root@pylinux opt]# find /opt/luffy_boy  -type f -name "*.txt" -ok  rm  {}  \;

备注
-exec 跟着shell命令，结尾必须以;分号结束，考虑系统差异，加上转义符\;
{}作用是替代find查阅到的结果
{}前后得有空格
#找到目录中所有的.txt文件，且将查询结果写入到all.txt文件中
[root@pylinux opt]# find ./mydj2/ -type f -name "*.txt" -exec cat {} \; > all.txt
#把30天以前的日志，移动到old文件夹中
find . -type f -mtime +30 -name "*.log" -exec cp {} old \;

```
### xargs命令
> xargs 又称管道命令，构造参数等。
是给命令传递参数的一个过滤器,也是组合多个命令的一个工具它把一个数据流分割为一些足够小的块,以方便过滤器和命令进行处理 。
简单的说就是把其他命令的给它的数据，传递给它后面的命令作为参数

```
-d 为输入指定一个定制的分割符，默认分隔符是空格
-i 用 {} 代替 传递的数据
-I string 用string来代替传递的数据-n[数字] 设置每次传递几行数据
-n 选项限制单个命令行的参数个数
-t 显示执行详情
-p 交互模式
-P n 允许的最大线程数量为n
-s[大小] 设置传递参数的最大字节数(小于131072字节)
-x 大于 -s 设置的最大长度结束 xargs命令执行
-0，--null项用null分隔，而不是空白，禁用引号和反斜杠处理

```

案例
```
多行输入变单行

[root@luffycity tmp]# cat mjj.txt
1 2 3 4
5 6 7 8
9 10
[root@luffycity tmp]# xargs < mjj.txt
1 2 3 4 5 6 7 8 9 10
-n参数限制每行输出个数

[root@luffycity tmp]# xargs -n 3 < mjj.txt        #每行最多输出3个
1 2 3
4 5 6
7 8 9
10
自定义分隔符-d参数

[root@luffycity tmp]# echo "alex,alex,alex,alex,alex," |xargs -d ","
alex alex alex alex alex

#定义分隔符后，限制每行参数个数
[root@luffycity tmp]# echo "alex,alex,alex,alex,alex," |xargs -d "," -n 2
alex alex
alex alex
alex
-i参数的用法，用{}替换传递的数据

-I 参数用法，用string代替数据

#找到当前目录所有的.txt文件，然后拷贝到其他目录下
[root@luffycity tmp]# find . -name "*.txt" |xargs -i  cp {} heihei/

[root@luffycity tmp]# find . -name "*.txt" |xargs -I data cp data  heihei/

#找到当前目录下所有txt文件，然后删除
[root@luffycity tmp]# find . -name "*.txt" |xargs -i rm -rf {}
重点

xargs识别字符串的标识是空格或是换行符，因此如果遇见文件名有空格或是换行符，xargs就会识别为两个字符串，就会报错

-print0在find中表示每一个结果之后加一个NULL字符，而不是换行符（find默认在结果后加上\n，因此结果是换行输出的）
Xargs -0 表示xargs用NULL作为分隔符


#修改find的输出结果，-print0可以改结尾为null
[root@luffycity tmp]# find . -name "*.txt" -print
./hello luffycity.txt
[root@luffycity tmp]# find . -name "*.txt" -print0
./hello luffycity.txt[root@luffycity tmp]#


#修改xargs，理解默认分隔符是NULL
find . -name "*.txt" -print0 |xargs -0 rm

```
### file命令
> 显示文件的类型
```
[root@luffycity tmp]# file /usr/bin/python2.7        #二进制解释器类型
/usr/bin/python2.7: ELF 64-bit LSB executable

[root@luffycity tmp]# file /usr/bin/yum                    #yum是python的脚本文件
/usr/bin/yum: Python script, ASCII text executable

[root@luffycity tmp]# file /usr/bin/cd                #shell脚本，内置命令
/usr/bin/cd: POSIX shell script, ASCII text executable

[root@luffycity tmp]# file hehe.txt            #text类型
hehe.txt: ASCII text

[root@luffycity tmp]# file heihei            #文件夹
heihei: directory

[root@luffycity tmp]# file /usr/bin/python2            #软链接类型
/usr/bin/python2: symbolic link to `python2.7'

```
### which
> 查找PATH环境变量中的文件，linux内置命令不在path中
```
[root@luffycity tmp]# which python
/usr/bin/python
```
### whereis命令
> whereis命令用来定位指令的二进制程序、源代码文件和man手册页等相关文件的路径。
```
[root@luffycity tmp]# whereis python
python: /usr/bin/python /usr/bin/python2.7 /usr/lib/python2.7 /usr/lib64/python2.7 /etc/python /usr/include/python2.7 /usr/share/man/man1/python.1.gz

```
### tar命令
> tar命令在linux系统里，可以实现对多个文件进行，压缩、打包、解包
    
    打包
    
    将一大堆文件或目录汇总成一个整体。
    
    压缩
    
    将大文件压缩成小文件，节省磁盘空间。

```

语法：
tar(选项)(参数)

-A或--catenate：新增文件到以存在的备份文件；
-B：设置区块大小；
-c或--create：建立新的备份文件；
-C <目录>：这个选项用在解压缩，若要在特定目录解压缩，可以使用这个选项。
-d：记录文件的差别；
-x或--extract或--get：从备份文件中还原文件；
-t或--list：列出备份文件的内容；
-z或--gzip或--ungzip：通过gzip指令处理备份文件；
-Z或--compress或--uncompress：通过compress指令处理备份文件；
-f<备份文件>或--file=<备份文件>：指定备份文件；
-v或--verbose：显示指令执行过程；
-r：添加文件到已经压缩的文件；
-u：添加改变了和现有的文件到已经存在的压缩文件；
-j：支持bzip2解压文件；
-v：显示操作过程；
-l：文件系统边界设置；
-k：保留原有文件不覆盖；
-m：保留文件不被覆盖；
-w：确认压缩文件的正确性；
-p或--same-permissions：用原来的文件权限还原文件；
-P或--absolute-names：文件名使用绝对名称，不移除文件名称前的“/”号；不建议使用
-N <日期格式> 或 --newer=<日期时间>：只将较指定日期更新的文件保存到备份文件里；
--exclude=<范本样式>：排除符合范本样式的文件。
-h, --dereference跟踪符号链接；将它们所指向的文件归档并输出
案例

仅打包，不压缩

#tar 参数 包裹文件名  需要打包的文件
[alex@luffycity tmp]$ tar -cvf alltmp.tar ./*
打包后且用gzip命令压缩，节省磁盘空间

[alex@luffycity tmp]$ tar -zcvf alltmp.tar ./*
注意

f参数必须写在最后，后面紧跟压缩文件名
tar命令仅打包，习惯用.tar作为后缀
tar命令加上z参数，文件以.tar.gz或.tgz表示
列出tar包内的文件

#根据tar包文件后缀，决定是否添加z参数，调用gzip
[alex@luffycity tmp]$ tar -ztvf alltmp2.tar.gz
拆开tar包

[root@luffycity tmp]# tar -xf alltmp.tar
拆开tar的压缩包

tar -zxvf ../alltmp2.tar.gz ./
拆除tar包中部分文件

#正常解压命令，单独加上你要拆除的文件名，指定路径
#先看下tar包中有什么内容，再指定文件解压

[root@luffycity tmp]# tar -ztvf ../alltmp2.tar.gz

[root@luffycity tmp]# tar -zxvf ../alltmp2.tar.gz ./alltmp.tar
./alltmp.tar
指定目录解tar包

[root@luffycity tmp]# tar -xf alltmp.tar -C /opt/data/
排除文件解包

#注意--exclude 跟着文件名或是文件夹，不得加斜杠，排除多个文件，就写多个--exclude
[root@luffycity tmp]# tar -zxvf ../alltmp2.tar.gz   --exclude data
打包链接文件

-h参数能够保证，打包的不仅仅是个快捷方式，而是找到源文件


打包/etc下所有普通文件

[root@luffycity tmp]# tar -zcvf etc.tgz `find /etc -type f`
[root@luffycity tmp]# tar -tzvf etc.tgz
```

### gzip命令
> 要说tar命令是个纸箱子用于打包，gzip命令就是压缩机器
gzip通过压缩算法lempel-ziv 算法(lz77) 将文件压缩为较小文件，节省60%以上的存储空间，以及网络传输速率
```
gzip(选项)(参数)

-a或——ascii：使用ASCII文字模式；
-c或--stdout或--to-stdout 　把解压后的文件输出到标准输出设备。 
-d或--decompress或----uncompress：解开压缩文件；
-f或——force：强行压缩文件。不理会文件名称或硬连接是否存在以及该文件是否为符号连接；
-h或——help：在线帮助；
-l或——list：列出压缩文件的相关信息；
-L或——license：显示版本与版权信息；
-n或--no-name：压缩文件时，不保存原来的文件名称及时间戳记；
-N或——name：压缩文件时，保存原来的文件名称及时间戳记；
-q或——quiet：不显示警告信息；
-r或——recursive：递归处理，将指定目录下的所有文件及子目录一并处理；
-S或<压缩字尾字符串>或----suffix<压缩字尾字符串>：更改压缩字尾字符串；
-t或——test：测试压缩文件是否正确无误；
-v或——verbose：显示指令执行过程；
-V或——version：显示版本信息；
-<压缩效率>：压缩效率是一个介于1~9的数值，预设值为“6”，指定愈大的数值，压缩效率就会愈高；
--best：此参数的效果和指定“-9”参数相同；
--fast：此参数的效果和指定“-1”参数相同。
案例

#压缩目录中每一个html文件为.gz,文件夹无法压缩，必须先tar打包
gzip *.html        #gzip压缩，解压都会删除源文件
列出压缩文件中信息

[root@luffycity tmp]# gzip -l *.gz        #不解压显示压缩文件内信息，以及压缩率
         compressed        uncompressed  ratio uncompressed_name
                 28                   0   0.0% 10.html
                 24                   0   0.0% 123
                 27                   0   0.0% 1.html
                 27                   0   0.0% 2.html
                 27                   0   0.0% 3.html
                 27                   0   0.0% 4.html
                 27                   0   0.0% 5.html
                 27                   0   0.0% 6.html
                 27                   0   0.0% 7.html
                 27                   0   0.0% 8.html
                 27                   0   0.0% 9.html
           23581672           118888884  80.2% alex.txt
           23582535           118896640  80.2% alltmp.tar
                289                 470  44.9% glances.log
                 45                  16 -12.5% hehe.txt
           47164836           237786010  80.2% (totals)
解压缩且显示过程

[root@luffycity tmp]# gzip -dv *.gz
10.html.gz:      0.0% -- replaced with 10.html
123.gz:      0.0% -- replaced with 123
1.html.gz:      0.0% -- replaced with 1.html
2.html.gz:      0.0% -- replaced with 2.html
3.html.gz:      0.0% -- replaced with 3.html
4.html.gz:      0.0% -- replaced with 4.html
5.html.gz:      0.0% -- replaced with 5.html
6.html.gz:      0.0% -- replaced with 6.html
7.html.gz:      0.0% -- replaced with 7.html
8.html.gz:      0.0% -- replaced with 8.html
9.html.gz:      0.0% -- replaced with 9.html
alex.txt.gz:     80.2% -- replaced with alex.txt
alltmp.tar.gz:     80.2% -- replaced with alltmp.tar
glances.log.gz:     44.9% -- replaced with glances.log
hehe.txt.gz:    -12.5% -- replaced with hehe.txt
压缩保留源文件

#-c参数
[root@luffycity tmp]# gzip -c  alltmp.tar > alltmp.tar.gz
gzip套件提供了许多方便的工具命令，可以直接操作压缩文件内容

zcat，直接读取压缩文件内容zcat hehe.txt.gz
zgrep
zless
zdiff

```

### zip命令
> zip 命令：是一个应用广泛的跨平台的压缩工具，压缩文件的后缀为 zip文件，还可以压缩文件夹

```

语法：
zip 压缩文件名  要压缩的内容

-A 自动解压文件
-c 给压缩文件加注释
-d 删除文件
-F 修复损坏文件
-k 兼容 DOS
-m 压缩完毕后，删除源文件
-q 运行时不显示信息处理信息
-r 处理指定目录和指定目录下的使用子目录
-v 显示信息的处理信息
-x “文件列表” 压缩时排除文件列表中指定的文件
-y 保留符号链接
-b<目录> 指定压缩到的目录
-i<格式> 匹配格式进行压缩
-L 显示版权信息
-t<日期> 指定压缩文件的日期
-<压缩率> 指定压缩率
最后更新 2018-03-08 19:33:4
案例

#压缩当前目录下所有内容为alltmp.zip文件
[root@luffycity tmp]# zip alltmp.zip ./*

#压缩多个文件夹
[root@luffycity tmp]# zip -r data.zip ./data ./data2
unzip命令用于解压

参数

-l：显示压缩文件内所包含的文件；
-d<目录> 指定文件解压缩后所要存储的目录。
案例

#查看压缩文件内容
[root@luffycity tmp]# unzip -l data.zip

#解压缩zip文件
[root@luffycity tmp]# unzip data.zip
```
### date命令
 
> date命令用于显示当前系统时间，或者修改系统时间
```
语法

date  参数   时间格式

参数

-d, --date=STRING
    显示由 STRING 指定的时间, 而不是当前时间 

-s, --set=STRING
    根据 STRING 设置时间 

-u, --utc, --universal
    显示或设置全球时间(格林威治时间)
时间格式

%%
    文本的 % 
%a
    当前区域的星期几的简写 (Sun..Sat) 
%A
    当前区域的星期几的全称 (不同长度) (Sunday..Saturday) 
%b
    当前区域的月份的简写 (Jan..Dec) 
%B
    当前区域的月份的全称(变长) (January..December) 
%c
    当前区域的日期和时间 (Sat Nov 04 12:02:33 EST 1989) 
%d
    (月份中的)几号(用两位表示) (01..31) 
%D
    日期(按照 月/日期/年 格式显示) (mm/dd/yy) 
%e
    (月份中的)几号(去零表示) ( 1..31) 
%h
    同 %b 
%H
    小时(按 24 小时制显示，用两位表示) (00..23) 
%I
    小时(按 12 小时制显示，用两位表示) (01..12) 
%j
    (一年中的)第几天(用三位表示) (001..366) 
%k
    小时(按 24 小时制显示，去零显示) ( 0..23) 
%l
    小时(按 12 小时制显示，去零表示) ( 1..12) 
%m
    月份(用两位表示) (01..12) 
%M
    分钟数(用两位表示) (00..59) 
%n
    换行 
%p
    当前时间是上午 AM 还是下午 PM 
%r
    时间,按 12 小时制显示 (hh:mm:ss [A/P]M) 
%s
    从 1970年1月1日0点0分0秒到现在历经的秒数 (GNU扩充) 
%S
    秒数(用两位表示)(00..60) 
%t
    水平方向的 tab 制表符 
%T
    时间,按 24 小时制显示(hh:mm:ss) 
%U
    (一年中的)第几个星期，以星期天作为一周的开始(用两位表示) (00..53) 
%V
    (一年中的)第几个星期，以星期一作为一周的开始(用两位表示) (01..52) 
%w
    用数字表示星期几 (0..6); 0 代表星期天 
%W
    (一年中的)第几个星期，以星期一作为一周的开始(用两位表示) (00..53) 
%x
    按照 (mm/dd/yy) 格式显示当前日期 
%X
    按照 (%H:%M:%S) 格式显示当前时间 
%y
    年的后两位数字 (00..99) 
%Y
    年(用 4 位表示) (1970...) 
%z
    按照 RFC-822 中指定的数字时区显示(如, -0500) (为非标准扩充) 
%Z
    时区(例如, EDT (美国东部时区)), 如果不能决定是哪个时区则为空 

默认情况下,用 0 填充数据的空缺部分. GNU 的 date 命令能分辨在 `%'和数字指示之间的以下修改.

    `-' (连接号) 不进行填充 `_' (下划线) 用空格进行填充
案例

显示当前系统部分时间

1.显示短年份
date +%y

2.显示长年份
date +%Y

3.显示月份
date +%m

4.显示几号
date +%d

5.显示几时
date +%H

6.显示几分
date +%M

7.显示整秒
date +%S

8.显示时间如，年-月-日
date +%F

9.显示时间如，时：分：秒
date +%T
-d参数指定时间显示，仅仅是显示

1.显示昨天
 date +%F -d "-1day"

2.显示昨天
date +%F -d "yesterday"

3.显示前天
date +%F -d "-2day"

4.显示明天日期
date +%F -d "+1day"

5.显示明天，英文表示
date +%F -d "tomorrow"

6.显示一个月之前，之后
[root@pylinux /]# date +%F -d "1month"
2019-12-01
[root@pylinux /]# date +%F -d "-1month"
2019-10-01

7.显示一年后
date +%F -d "1year"

8.显示60分钟后
date +%T -d "60min"


+表示未来
-表示过去
day表示日
month表示月份
year表示年
min表示分钟
-s设置时间

设置时间较少，一般配置ntp时间服务器

1.设置时间
[root@pylinux /]# date -s "20170808"
2017年 08月 08日 星期二 00:00:00 CST
[root@pylinux /]#
[root@pylinux /]# date
2017年 08月 08日 星期二 00:00:00 CST



2.修改分钟
[root@pylinux /]# date -s "05:06:33"
2017年 08月 08日 星期二 05:06:33 CST
[root@pylinux /]# date
2017年 08月 08日 星期二 05:06:33 CST


3.修改日期和分钟
[root@pylinux /]# date -s "20180606 05:30:30"
2018年 06月 06日 星期三 05:30:30 CST
[root@pylinux /]# date
2018年 06月 06日 星期三 05:30:31 CST

4.可设置不同格式的时间
date -s "2018-06-06 05:30:30"
date -s "2018/07/07 05:30:30"
```




















#### Linux开关机命令
|命令	|说明|
|:--:|:--:|
|shutdown -h now	|立刻关机，企业用法|
|shutdown -h 1	|1分钟后关机，也可以写时间如 11:30|
|halt	|立刻关闭系统，需手工切断电源|
|init 0	|切换运行级别为0，0表示关机|
poweroff|	立刻关闭系统，且关闭电源|
|重启	|
|reboot|	立刻重启机器，企业用法|
Shutdown -r now	|立刻重启，企业用法|
|shutdown -r 1|	一分钟后重启|
|Init 6|	切换运行级别为6，此级别是重启|
|注销命令	|
|logout|	注销退出当前用户|
|exit	|注销退出当前用户，快捷键ctrl + d|

#### Linux命令行常用快捷键


```
ctrl + c     cancel取消当前操作
ctrl + l    清空屏幕内容
ctrl + d    退出当前用户
ctrl + a     光标移到行首
ctrl + e    光标移到行尾
ctrl + u  删除光标到行首的内容

```

## 虚拟机的ip配置

```
VMnet8 更改
虚拟机->编辑->更改设置->NAT模式打勾-> 将主机虚拟适配器连接到此网路

创建虚拟的网卡ip
子网ip 192.168.178.0 子网掩码255.255.255.0

-> Nat 设置 网关ip 常用为192.168.178.254


查看ip 
ip addr show

vi /etc/sysconfig/network-scripts/ifcfg-ens33

i为编写

修改为


TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static"    --静态
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="7264e0dc-167c-4f01-b12b-40365a63c45d"
DEVICE="ens33"
ONBOOT="yes"   --设置自动开启
IPADDR=192.168.178.110  --设置统一网段的开启
NETMASK=255.255.255.0 --网编码
GATEWAY=192.168.178.254  --网关
DNS1=119.29.29.29  dns1 腾讯的


按键esc 取消
输入 :wq! 保存当前编写

systemctl stop NetworkManager 停止有线服务
systemctl restart network
重启有线服务

按下clat+alt -f1-f7 //切换终端

passwd  //修改root密码


ssh root@192.168.11.45  //登录
ssh 登录的用户名@主机名
```
### shred命令

```
用法：shred [选项]... 文件...

多次覆盖文件，使得即使是昂贵的硬件探测仪器也难以将数据复原。

-u, --remove 覆盖后截断并删除文件
shred heihei.txt  随机覆盖文件内容，不删除源文件


案例

彻底粉碎且删除文件

[root@pylinux tmp]# ls -lh
总用量 25M
-rw-r--r-- 1 root root 25M 10月 14 15:02 heihei.txt
[root@pylinux tmp]#
[root@pylinux tmp]# shred -u heihei.txt

```


508 0.9 

### 修改宝塔面板的登录提示
> 先安装宝塔，如果登陆啥事都没有那最好，如果提示必须要登陆宝塔账户。
那么，在terminal里执行：

- bt default
```
sed -i "s|if (bind_user == 'True') {|if (bind_user == 'REMOVED') {|g" /www/server/panel/BTPanel/static/js/index.js
全选代码复制
完工。
```
```
同理，如果要还原

sed -i "s|if (bind_user == 'REMOVED') {|if (bind_user == 'True') {|g" /www/server/panel/BTPanel/static/js/index.js
全选代码复制
手动修改
```

```
/www/server/panel/BTPanel/static/js/index.js

找到这个文件，搜索

bind_user

把

if (bind_user == 'True') {
show_force_bind();
}
全选代码复制
改成

if (bind_user == 'REMOVED') {
show_force_bind();
}
全选代码复制
需要还原就改成上面那个就可以了。

这样就可以去除宝塔的强制登陆提示了
```
docker run -id --name jenkins -p 8080:8080 -v /home/data/jenkins:/var/jenkins_home jenkins/jenkins:lts
