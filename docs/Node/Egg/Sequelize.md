# Sequelize-egg 中的使用

## 安装

``` sh
npm install --save egg-sequelize mysql2

```

## 配置更改

* 在 config/plugin.js 中引入 egg-sequelize 插件

``` js
exports.sequelize = {
    enable: true,
    package: 'egg-sequelize',
};
```

* 在 config/config.default.js 中编写 sequelize 配置

``` js
config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg-sequelize-doc-default',
};
```

## 编写代码

### 创建所需的MOdel

> app/model/ 目录下编写Model

> 可使用 sequelize-automate 插件来自定义生成Model

``` 

npm install sequelize-automate --save
```

### [详细文档地址](https://github.com/nodejh/sequelize-automate)

### sequelize-automate 命令详解

``` 

sequelize-automate 命令支持的参数主要有：

--type, -t 指定 models 代码风格，当前可选值：js ts egg midway
--dialect, -e 数据库类型，可选值：mysql sqlite postgres mssql mariadb
--host, -h 数据库 host
--database, -d 数据库名
--user, -u 数据库用户名
--password, -p 数据库密码
--port, -P 数据库端口，默认：MySQL/MariaDB 3306，Postgres 5432，SSQL: 1433
--output, -o 指定输出 models 文件的目录，默认会生成在当前目录下 models 文件夹中
--camel, -C models 文件中代码是否使用驼峰发命名，默认 false
--emptyDir, -r 是否清空 models 目录（即 -o 指定的目录），如果为 true，则生成 models 之前会清空对应目录，默认 false
--config, -c 指定配置文件，可以在一个配置文件中指定命令的参数
```

自定义的命令

``` js
sequelize - automate - t js - h 127.0 .0 .1 - d Test - u Test - p 123456 - P 3306 - e mysql - o models
```

### 生成的Module 需要注意的事项

> 生成的Moudle 建议改成一下格式

::: tip

* Model 的名字首字母建议大写

:::

``` js
'use strict';
module.exports = sequelize => {
    const {
        model,
        Sequelize: {
            DataTypes
        }
    } = sequelize;
    const attributes = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: true,
            comment: null,
            field: 'id',
        },
        user: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: 'user',
        },
        pass: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: 'pass',
        },
        create_data: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: 'create_data',
        },
        update_data: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: 'update_data',
        },
        logo: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: 'logo',
        },
    };
    const options = {
        tableName: 'user',
        comment: '',
        indexes: [],
    };
    const UserModel = model.define('user_model', attributes, options);
    return UserModel;
};
```

## [sequelize](https://www.sequelize.com.cn/core-concepts/model-basics)的一些使用方法

::: tip
此处只有部分的使用案例，具体移步到上述中文文档
:::

### INSERT 

> Model.create() 方法是使用 Model.build() 构建未保存实例并使用 instance.save() 保存实例的简写形式.

* 方式一：调用 build 方法后对象只存在于内存中，需要进一步调用 save 方法才会保存到数据库中。

``` js
let user = UsersModel.build({
    username: "swnd",
    password: "q11111"
});
user = await user.save();
```

* 方式二：调用 create 方法后，会直接保存到数据库中。

``` js
const user = UsersModel.create({
    username: 'zhangsan',
    password: '123456'
}, {
    fields: ['username'] // 只允许更新这个
})
```

### SELECT 

> attributes  选择查出数据需要展示的字段

``` js
Model.findAll({
    attributes: ['foo', 'bar']
});
```

> 可以使用嵌套数组来重命名属性：

``` js
Model.findAll({
    attributes: ['foo', ['bar', 'baz'], 'qux']
});

SELECT foo, bar AS baz, qux FROM...
```

> 你可以使用 sequelize.fn 进行聚合：

``` js
Model.findAll({
    attributes: [
        'foo',
        [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats']
        'bar'
    ]
});
SELECT foo, COUNT(hats) AS n_hats, bar FROM...
```

使用聚合函数时, 必须为它提供一个别名, 以便能够从模型中访问它. 在上面的示例中, 你可以通过 instance.n_hats 获取帽子数量.

> 有时, 如果只想添加聚合, 那么列出模型的所有属性可能会很麻烦：

``` js
// 这是获取帽子数量的烦人方法(每列都有)
Model.findAll({
    attributes: [
        'id', 'foo', 'bar', 'baz', 'qux', 'hats', // 我们必须列出所有属性...
        [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'] // 添加聚合...
    ]
});

// 这个更短,并且更不易出错. 如果以后在模型中添加/删除属性,它仍然可以正常工作
Model.findAll({
    attributes: {
        include: [
            [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats']
        ]
    }
});
SELECT id, foo, bar, baz, qux, hats, COUNT(hats) AS n_hats FROM...
```

> 同样, 也可以排除某些属性：

``` js
Model.findAll({
    attributes: {
        exclude: ['baz']
    }
});
--Assuming all columns are 'id', 'foo', 'bar', 'baz'
and 'qux'
SELECT id, foo, bar, qux FROM...
```

### WHERE 

> where 参数用于过滤查询.where 子句有很多运算符, 可以从 Op 中以 Symbols 的形式使用.

基础

``` js
Post.findAll({
    where: {
        authorId: 2
    }
});
// SELECT * FROM post WHERE authorId = 2
```

可以看到没有显式传递任何运算符(来自Op), 因为默认情况下 Sequelize 假定进行相等比较. 上面的代码等效于：

``` js
const {
    Op
} = require("sequelize");
Post.findAll({
    where: {
        authorId: {
            [Op.eq]: 2
        }
    }
});
// SELECT * FROM post WHERE authorId = 2
```

可以传递多个校验:

``` js
Post.findAll({
    where: {
        authorId: 12
        status: 'active'
    }
});
// SELECT * FROM post WHERE authorId = 12 AND status = 'active';
```

就像在第一个示例中 Sequelize 推断出 Op.eq 运算符一样, 在这里 Sequelize 推断出调用者希望对两个检查使用 AND. 上面的代码等效于：

``` js
const {
    Op
} = require("sequelize");
Post.findAll({
    where: {
        [Op.and]: [{
                authorId: 12
            },
            {
                status: 'active'
            }
        ]
    }
});
// SELECT * FROM post WHERE authorId = 12 AND status = 'active';
```

OR 可以通过类似的方式轻松执行：

``` js
const {
    Op
} = require("sequelize");
Post.findAll({
    where: {
        [Op.or]: [{
                authorId: 12
            },
            {
                authorId: 13
            }
        ]
    }
});
// SELECT * FROM post WHERE authorId = 12 OR authorId = 13;
```

由于以上的 OR 涉及相同字段 , 因此 Sequelize 允许你使用稍有不同的结构, 该结构更易读并且作用相同：

``` js
const {
    Op
} = require("sequelize");
Post.destroy({
    where: {
        authorId: {
            [Op.or]: [12, 13]
        }
    }
});
// DELETE FROM post WHERE authorId = 12 OR authorId = 13;
```

操作符
Sequelize 提供了多种运算符.

``` js
const {
    Op
} = require("sequelize");
Post.findAll({
    where: {
        [Op.and]: [{
            a: 5
        }, {
            b: 6
        }], // (a = 5) AND (b = 6)
        [Op.or]: [{
            a: 5
        }, {
            b: 6
        }], // (a = 5) OR (b = 6)
        someAttribute: {
            // 基本
            [Op.eq]: 3, // = 3
            [Op.ne]: 20, // != 20
            [Op.is]: null, // IS NULL
            [Op.not]: true, // IS NOT TRUE
            [Op.or]: [5, 6], // (someAttribute = 5) OR (someAttribute = 6)

            // 使用方言特定的列标识符 (以下示例中使用 PG):
            [Op.col]: 'user.organization_id', // = "user"."organization_id"

            // 数字比较
            [Op.gt]: 6, // > 6
            [Op.gte]: 6, // >= 6
            [Op.lt]: 10, // < 10
            [Op.lte]: 10, // <= 10
            [Op.between]: [6, 10], // BETWEEN 6 AND 10
            [Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15

            // 其它操作符

            [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

            [Op.in]: [1, 2], // IN [1, 2]
            [Op.notIn]: [1, 2], // NOT IN [1, 2]

            [Op.like]: '%hat', // LIKE '%hat'
            [Op.notLike]: '%hat', // NOT LIKE '%hat'
            [Op.startsWith]: 'hat', // LIKE 'hat%'
            [Op.endsWith]: 'hat', // LIKE '%hat'
            [Op.substring]: 'hat', // LIKE '%hat%'
            [Op.iLike]: '%hat', // ILIKE '%hat' (不区分大小写) (仅 PG)
            [Op.notILike]: '%hat', // NOT ILIKE '%hat'  (仅 PG)
            [Op.regexp]: '^[h|a|t]', // REGEXP/~ '^[h|a|t]' (仅 MySQL/PG)
            [Op.notRegexp]: '^[h|a|t]', // NOT REGEXP/!~ '^[h|a|t]' (仅 MySQL/PG)
            [Op.iRegexp]: '^[h|a|t]', // ~* '^[h|a|t]' (仅 PG)
            [Op.notIRegexp]: '^[h|a|t]', // !~* '^[h|a|t]' (仅 PG)

            [Op.any]: [2, 3], // ANY ARRAY[2, 3]::INTEGER (仅 PG)

            // 在 Postgres 中, Op.like/Op.iLike/Op.notLike 可以结合 Op.any 使用:
            [Op.like]: {
                [Op.any]: ['cat', 'hat']
            } // LIKE ANY ARRAY['cat', 'hat']

            // 还有更多的仅限 postgres 的范围运算符,请参见下文
        }
    }
});
```

Op.in 的简写语法
直接将数组参数传递给 where 将隐式使用 IN 运算符：

``` 

Post.findAll({
  where: {
    id: [1,2,3] // 等同使用 `id: { [Op.in]: [1,2,3] }`
  }
});
// SELECT ... FROM "posts" AS "post" WHERE "post"."id" IN (1, 2, 3);
```

运算符的逻辑组合
运算符 Op.and, Op.or 和 Op.not 可用于创建任意复杂的嵌套逻辑比较.

使用 Op.and 和 Op.or 示例#

``` js
const {
    Op
} = require("sequelize");

Foo.findAll({
    where: {
        rank: {
            [Op.or]: {
                [Op.lt]: 1000,
                [Op.eq]: null
            }
        },
        // rank < 1000 OR rank IS NULL

        {
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
            }
        },
        // createdAt < [timestamp] AND createdAt > [timestamp]

        {
            [Op.or]: [{
                    title: {
                        [Op.like]: 'Boat%'
                    }
                },
                {
                    description: {
                        [Op.like]: '%boat%'
                    }
                }
            ]
        }
        // title LIKE 'Boat%' OR description LIKE '%boat%'
    }
});
```

使用 Op.not 示例#

``` js
Project.findAll({
    where: {
        name: 'Some Project',
        [Op.not]: [{
                id: [1, 2, 3]
            },
            {
                description: {
                    [Op.like]: 'Hello%'
                }
            }
        ]
    }
});
上面将生成：

SELECT *
    FROM `Projects`
WHERE(
    `Projects`.
    `name` = 'a project'
    AND NOT(
        `Projects`.
        `id`
        IN(1, 2, 3) OR `Projects`.
        `description`
        LIKE 'Hello%'
    )
)
```

### UPDATE  

``` js
// 将所有没有姓氏的人更改为 "Doe"
await UsersModel.update({
    lastName: "Doe"
}, {
    where: {
        lastName: null
    }
});
```

### DELETE 

```js 
// 删除所有名为 "Jane" 的人 
await UsersModel.destroy({
  where: {

    firstName: "Jane"

  }
}); 

``` 

> 要销毁所有内容,可以使用 TRUNCATE SQL：
```js
// 截断表格
await User.destroy({
  truncate: true
});
```

### findAll

findAll 方法. 它生成一个标准的 SELECT 查询, 该查询将从表中检索所有条目(除非受到 where 子句的限制).

### findByPk

findByPk 方法使用提供的主键从表中仅获得一个条目.

``` js
const project = await Project.findByPk(123);
if (project === null) {
    console.log('Not found!');
} else {
    console.log(project instanceof Project); // true
    // 它的主键是 123
}
```

### findOne

findOne 方法获得它找到的第一个条目(它可以满足提供的可选查询参数).

``` js
const project = await Project.findOne({
    where: {
        title: 'My Title'
    }
});
if (project === null) {
    console.log('Not found!');
} else {
    console.log(project instanceof Project); // true
    console.log(project.title); // 'My Title'
}
```

### findOrCreate

> 除非找到一个满足查询参数的结果, 否则方法 findOrCreate 将在表中创建一个条目. 在这两种情况下, 它将返回一个实例(找到的实例或创建的实例)和一个布尔值, 指示该实例是已创建还是已经存在.

使用 where 参数来查找条目, 而使用 defaults 参数来定义必须创建的内容. 如果 defaults 不包含每一列的值, 则 Sequelize 将采用 where 的值(如果存在).

假设我们有一个空的数据库, 该数据库具有一个 User 模型, 该模型具有一个 username 和一个 job.

``` js
const [user, created] = await User.findOrCreate({
    where: {
        username: 'sdepold'
    },
    defaults: {
        job: 'Technical Lead JavaScript'
    }
});
console.log(user.username); // 'sdepold'
console.log(user.job); // 这可能是也可能不是 'Technical Lead JavaScript'
console.log(created); // 指示此实例是否刚刚创建的布尔值
if (created) {
    console.log(user.job); // 这里肯定是 'Technical Lead JavaScript'
}
```

### findAndCountAll

> findAndCountAll 方法是结合了 findAll 和 count 的便捷方法. 在处理与分页有关的查询时非常有用, 在分页中, 你想检索带有 limit 和 offset 的数据, 但又需要知道与查询匹配的记录总数.

``` js
findAndCountAll 方法返回一个具有两个属性的对象：

count - 一个整数 - 符合查询条件的记录总数
rows - 一个数组对象 - 获得的记录
const {
    count,
    rows
} = await Project.findAndCountAll({
    where: {
        title: {
            [Op.like]: 'foo%'
        }
    },
    offset: 10,
    limit: 2
});
console.log(count);
console.log(rows);
```

## 关联查的一些方法

> Sequelize 支持标准关联关系: 一对一, 一对多 和 多对多.

* A.hasOne(B) 关联意味着 A 和 B 之间存在一对一的关系, 外键在目标模型(B)中定义.

* A.belongsTo(B)关联意味着 A 和 B 之间存在一对一的关系, 外键在源模型中定义(A).

* A.hasMany(B) 关联意味着 A 和 B 之间存在一对多关系, 外键在目标模型(B)中定义.

> 这三个调用将导致 Sequelize 自动将外键添加到适当的模型中(除非它们已经存在).

* A.belongsToMany(B, { through: 'C' }) 关联意味着将表 C 用作联结表, 在 A 和 B 之间存在多对多关系. 具有外键(例如, aId 和 bId). Sequelize 将自动创建此模型 C(除非已经存在), 并在其上定义适当的外

### 一对一关系

> 对于本示例的其余部分, 我们假设我们有两个模型, 即 Foo 和 Bar. 我们想要在它们之间建立一对一的关系, 以便 Bar 获得 fooId 列.

实现该目标的主要设置如下：

``` js
Foo.hasOne(Bar);
Bar.belongsTo(Foo);
```

自定义外键

> 上面显示的 hasOne 和 belongsTo 调用都会推断出要创建的外键应称为 fooId. 如要使用其他名称, 例如 myFooId：

``` js
// 方法 1
Foo.hasOne(Bar, {
    foreignKey: 'myFooId', //从表的id
    as: 'acticle', //定义别名
    sourceKey: 'article_id' //当前主表的id 
});
Bar.belongsTo(Foo);

// 方法 2
Foo.hasOne(Bar, {
    foreignKey: {
        name: 'myFooId'
    }
});
Bar.belongsTo(Foo);

// 方法 3
Foo.hasOne(Bar);
Bar.belongsTo(Foo, {
    foreignKey: 'myFooId'
});

// 方法 4
Foo.hasOne(Bar);
Bar.belongsTo(Foo, {
    foreignKey: {
        name: 'myFooId'
    }
});
```

::: tip

``` js
Ship.belongsTo(Captain, {
    targetKey: 'name',
    foreignKey: 'captainName'
});
A.hasOne(B) 和 A.hasMany(B) 将外键保留在目标模型(B)中,因此引用的键在源模型中,因此使用了 sourceKey. 
原模型 需要关联的字段id 是  sourceKey
foreignKey 对应的id 是目标源的id
A.belongsTo(B) 将外键保留在源模型中(A),因此引用的键在目标模型中,因此使用了 targetKey.
外键保存源模型  foreignKey  为查询的从 id
外键保存目标模型  foreignKey  为主的 id

```

以上方法可用于一对一
:::

强制性与可选性关联

> 默认情况下, 该关联被视为可选. 换句话说, 在我们的示例中, fooId 允许为空, 这意味着一个 Bar 可以不存在 Foo 而存在. 只需在外键选项中指定 allowNull: false 即可更改此设置：

``` js
Foo.hasOne(Bar, {
    foreignKey: {
        allowNull: false
    }
});
```

### 一对多关系

> 在这个例子中, 我们有模型 Team 和 Player. 我们要告诉 Sequelize, 他们之间存在一对多的关系, 这意味着一个 Team 有 Player , 而每个 Player 都属于一个 Team.

``` js
Team.hasMany(Player);
Player.belongsTo(Team);
```

``` js
Team.hasMany(Player, {
    foreignKey: 'myFooId', //从表的id
    as: 'acticle', //定义别名
    sourceKey: 'article_id' //当前主表的id 
});
Player.belongsTo(Team);
```
