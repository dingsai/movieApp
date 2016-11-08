var gulp=require("gulp");
var concat=require("gulp-concat");
var browserSync=require("browser-sync").create();
var reload=browserSync.reload;
var sass=require("gulp-sass");
var uglify=require("gulp-uglify");
var clean=require("gulp-clean");
gulp.task("testconcat",function(){
    gulp.src(["js/script1.js","js/script2.js"])
        .pipe(concat("hebing.js"))
        .pipe(gulp.dest("wenjianjia/"))
})


gulp.task("sass",function(){
    gulp.src("scss/main.scss")
        .pipe(sass())
        .on("error",function(err){
            console.log(err.message)
        })
        .pipe(gulp.dest("css/"))
        .pipe(reload({stream:true}))
})

gulp.task("server",["sass"],function(){
    browserSync.init({//初始化browserSync
        server:"./",
        startPath:"index.html"

    })

    gulp.watch("index.html").on("change",reload);
    gulp.watch("scss/*.scss",["sass"]);//执行sass任务
});

gulp.task("minjs",function(){
    gulp.src("wenjianjia/hebing.js")
        .pipe(uglify())//智能操作一个js  所以操作合并后的
        .pipe(gulp.dest("compress"));
})
gulp.task("build",["testconcat","minjs"]);

gulp.task("clean",function(){
    gulp.src(["css","minjs"])
        .pipe(clean())
});

