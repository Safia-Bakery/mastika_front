import Card from "src/components/Card";
import Header from "src/components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Loading from "src/components/Loader";
import { errorToast, successToast } from "src/utils/toast";
import usePermissions from "src/hooks/usePermissions";
import Button from "src/components/Button";
import { useForm } from "react-hook-form";
import useRoles from "src/hooks/useRoles";
import roleMutation from "src/hooks/mutation/roleMutation";

const ShowRole = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, refetch, isLoading } = useRoles({
    id: Number(id),
    enabled: !!id,
  });
  const role = data?.[0];
  const { mutate } = roleMutation();
  const { data: permissions } = usePermissions({});

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  const onSubmit = () => {
    const ids = Object.values(getValues())
      .filter((val) => !!val)
      .map((item) => +item);

    mutate(
      { ids, role_id: Number(id) },
      {
        onSuccess: () => {
          refetch();
          successToast("successfully updated");
        },
        onError: (e: any) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (role?.role_permission) {
      const init = role.role_permission.reduce((acc: any, item) => {
        acc[item.pagecrud_id] = item.pagecrud_id;
        return acc;
      }, {});
      reset(init);
    }
  }, [role]);

  if (isLoading) return <Loading />;

  return (
    <Card className="p-4">
      <Header title={role?.name}>
        <Button
          onClick={() => navigate(-1)}
          className="bg-primary"
          textClassName="text-white"
        >
          Назад
        </Button>
      </Header>

      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="table table-striped table-hover report-table">
            {!!permissions?.length &&
              permissions?.map((item) => {
                return (
                  <Fragment key={item?.name}>
                    <thead className="bg-primary border-gray-400 border-2">
                      <tr>
                        <th>{item?.name}</th>
                        <th />
                      </tr>
                    </thead>

                    <tbody className="bg-mainGray border-gray-400 border-x ">
                      {item.pages_crud.map((child) => (
                        <tr
                          key={child?.id}
                          className="border-b-2 border-b-gray-400 hover:bg-hoverGray transition-colors"
                        >
                          <td className="text-left">{child?.name}</td>
                          <td width={50}>
                            <input
                              type="checkbox"
                              value={child?.id}
                              {...register(`${child.id}`)}
                              // defaultChecked={rolePermission?.permissions?.includes(
                              //   child?.id
                              // )}
                              // onChange={() => handlePermission(child?.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Fragment>
                );
              })}
          </table>
          <div className="w-full flex justify-end">
            <Button className="bg-darkYellow mt-4 w-64 " type="submit">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default ShowRole;
